import { performance, PerformanceObserver } from 'perf_hooks';
import crypto from 'crypto';

class Tracer {
  constructor(serviceName) {
    this.serviceName = serviceName;
    this.spans = new Map();
    this.exportInterval = setInterval(() => this.exportSpans(), 10000);
  }
  
  startSpan(name, parentSpanId = null) {
    const spanId = crypto.randomBytes(8).toString('hex');
    const traceId = parentSpanId ? this.spans.get(parentSpanId)?.traceId : crypto.randomBytes(16).toString('hex');
    
    const span = {
      id: spanId,
      traceId,
      parentSpanId,
      name,
      service: this.serviceName,
      startTime: performance.now(),
      endTime: null,
      duration: null,
      tags: {},
      logs: []
    };
    
    this.spans.set(spanId, span);
    return spanId;
  }
  
  endSpan(spanId, status = 'OK') {
    const span = this.spans.get(spanId);
    if (!span) return;
    
    span.endTime = performance.now();
    span.duration = span.endTime - span.startTime;
    span.status = status;
    
    // Auto-export if this is a root span
    if (!span.parentSpanId) {
      this.exportSpan(span);
    }
    
    return span;
  }
  
  addTag(spanId, key, value) {
    const span = this.spans.get(spanId);
    if (span) {
      span.tags[key] = value;
    }
  }
  
  log(spanId, message, data = {}) {
    const span = this.spans.get(spanId);
    if (span) {
      span.logs.push({
        timestamp: new Date().toISOString(),
        message,
        data: JSON.stringify(data)
      });
    }
  }
  
  exportSpan(span) {
    // In a real application, this would send the span to a tracing backend
    // like Jaeger, Zipkin, or AWS X-Ray
    console.log('Exporting span:', JSON.stringify(span, null, 2));
    
    // Clean up
    this.spans.delete(span.id);
  }
  
  exportSpans() {
    // Export any remaining spans that have ended
    for (const [id, span] of this.spans.entries()) {
      if (span.endTime) {
        this.exportSpan(span);
      }
    }
  }
  
  injectContext(spanId, headers = {}) {
    const span = this.spans.get(spanId);
    if (!span) return headers;
    
    return {
      ...headers,
      'x-trace-id': span.traceId,
      'x-span-id': span.id,
      'x-service': this.serviceName
    };
  }
  
  extractContext(headers) {
    const traceId = headers['x-trace-id'] || crypto.randomBytes(16).toString('hex');
    const parentSpanId = headers['x-span-id'] || null;
    
    return { traceId, parentSpanId };
  }
}

// Usage example
const tracer = new Tracer('user-service');

// Simulate a request
function handleRequest(req) {
  const { traceId, parentSpanId } = tracer.extractContext(req.headers);
  const spanId = tracer.startSpan('handle-request', parentSpanId);
  
  tracer.addTag(spanId, 'http.method', req.method);
  tracer.addTag(spanId, 'http.url', req.url);
  
  // Simulate work
  setTimeout(() => {
    // Call another service
    const childSpanId = tracer.startSpan('call-auth-service', spanId);
    
    setTimeout(() => {
      tracer.endSpan(childSpanId, 'OK');
      
      // End the request
      tracer.endSpan(spanId, 'OK');
    }, 100);
  }, 50);
  
  return { status: 'processing', traceId };
}

// Simulate an incoming request
const request = {
  method: 'GET',
  url: '/api/users/123',
  headers: {}
};

const response = handleRequest(request);
console.log('Response:', response);

// Wait for spans to complete
setTimeout(() => {}, 200);
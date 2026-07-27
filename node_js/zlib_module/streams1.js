import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
// Compress a file
async function compressFile(inputPath) {
    const outputPath = inputPath + '.gz';

    await pipeline(
        fs.createReadStream(inputPath),
        zlib.createGzip(),
        fs.createWriteStream(outputPath)
    );
    // Get file sizes for comparison
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
    if (inputStats.size === 0) {
    console.log("Compression ratio: N/A (input file is empty)");
} else {
    const ratio =
        (1 - outputStats.size / inputStats.size) * 100;

    console.log(`Compression ratio: ${ratio.toFixed(2)}%`);
}
    console.log("Compression finished");

    return outputPath;
}
// Decompress a file
async function decompressFile(inputPath) {
    const outputPath = inputPath.replace(/\.gz$/, '');

    await pipeline(
        fs.createReadStream(inputPath),
        zlib.createGunzip(),
        fs.createWriteStream(outputPath)
    );

    console.log("Decompression finished");
}

(async () => {
    const gz = await compressFile("example.txt");
    await decompressFile(gz);
})();


// Example usage (assuming you have a text file)
// compressFile('example.txt');
// decompressFile('example.txt.gz');

// Note: Uncomment the above lines to actually run the compression/decompression
console.log('This example shows how to compress and decompress files using streams.');
console.log('Create a text file named "example.txt" and uncomment the function calls to test.');
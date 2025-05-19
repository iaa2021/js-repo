const person = {
    pName : 'John',
    age : 30, 
    city : 'Olbany',
    fullName : function(){
        return this.pName + ' ' + this.age;
    }
};
console.log("via Object.values()\n" ,Object.values(person));
let text = '';
for (let index in person) {
    text += person[index] + ", "; 
};
console.log("via loop\n" ,text);
text = '';
for( let [property, value] of Object.entries(person)){
    text += property + ": " + value + "\n";
}
console.log("via Object.entries()\n", text);
text = JSON.stringify(person);
console.log("via JSON.stringify()\n", text);
let text1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let length = text1.length;
console.log(length)

class Comment {
    constructor(text) {
        this.text = text
        this.votesQty = 0
    }
    upvote(){
        this.votesQty ++
    }
    static mergeComment(first, second){
        return `${first} ${second}`;
    }
}
const firstComment = new Comment('First comment')
console.table(firstComment)
console.table(firstComment instanceof Comment)//check if firstComment is derived from Comment
firstComment.upvote()
console.table(firstComment)
console.log(firstComment.hasOwnProperty('text'))
const secondComment = new Comment('Second comment')
const string = Comment.mergeComment(firstComment.text, secondComment.text)
console.log(string)

class Comment {
    constructor(text) {
        this.text = text
        this.votesQty = 0
    }
    upvote(){
        this.votesQty++
    }
}
const firstComment = new Comment('First comment')
console.table(firstComment)

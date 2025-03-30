const userProfile = {
    name1: 'Andrey',
    commentsQty: 13,
    aggreament: true,
}
const userInfo = ({name1, commentsQty}) =>{
    if(!commentsQty){
        return `User ${name1} has no comments`
    }
    else if(commentsQty < 15){
        return `User ${name1} has ${commentsQty} comments, that's too few.`
    }
    else{
        return `User ${name1} has ${commentsQty} comments`
    }
}
userInfo(userProfile)
console.log(userInfo(userProfile))
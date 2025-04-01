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
const month = 1
switch (month) {
    case 12:
        console.log('december')
        break;
    case 1:
        console.log('janiary')
        break;
    case 2: 
        console.log('febryary')
        break;
    default:
        console.log('This is not winter month.')
        break;
}
(month < 3 || month === 12) ? console.log('This is winter month.') : console.log('This is not winter month.')
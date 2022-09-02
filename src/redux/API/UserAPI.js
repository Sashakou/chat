import * as axios from "axios";

export async function GetUsers() {
    const response = await axios.get('http://23.88.43.148/users');
    console.log(response.data);
    return response.data
}


// const GetUsers = async () => {
//     setIsLoading(true);
//     try {
//         const response = await axios.get('http://23.88.43.148/users');
//         console.log(response.data);
//         setUsers(response.data);
//         URL_CurrentPage(QueryString, currentPage, response.data.length, userPerPage);
//
//         //if(Math.ceil(response.data.length / userPerPage) > 1) paginate(Number(page));
//         //setUsers([{desc:"qqq",name:"sardor",surname:"akbarov",user_id:503,__v:0,_id:"62c93e4ceae68ab859474206"},{desc:"qqq1",name:"sardor",surname:"akbarov",user_id:503,__v:0,_id:"62c93e4ceae68ab859474206"}]);
//     } catch (error) {
//         console.log('error', error);
//         onShowAlert('error', error.response.data.message);
//     } finally {
//         setIsLoading(false);
//     }
// }
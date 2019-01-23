import { ADD_PRODUCT } from '../constant/constant'

export const addProduct = (title, description, image) => {
    return dispatch => {
        const placeData = {
            name: 'testTitle',
            description: 'testdescription'
        };
        fetch("https://build-buiz.firebaseio.com/", {
            method: "POST",
            body: JSON.stringify(placeData)
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log('console',parsedRes);
        });
    };
};


import { Page } from "@playwright/test";

type testData= {
    firstName: string;
    lastName: string;
    email: string;
    fakeEmail: string;
    password: string;
    productItem: string;
    productItemColor: string;
    productItemSize: string;
    getRandomNumber(length:number): string;
    setRandomMail(email: string, length:number): string;

}


const data: testData ={

    firstName: 'TestName',
    lastName:'TestLast',
    email:'testmail589@gmail.com',
    fakeEmail:'testmail@gmail.com',
    password: 'testPass_1234',
    productItem: 'Emma Leggings',
    productItemColor: 'Red',
    productItemSize: '28',

    getRandomNumber(length) {
        let randomNumber = '';
        const numbers = '01234566789';
        for (let i = 0; i < length; i++) {
            randomNumber += numbers[Math.floor(Math.random() * numbers.length)];
        }
        return randomNumber;
    },

    setRandomMail(email, length){
        const randomNumber = this.getRandomNumber(length);
        const emailList = email.split('@');
        return emailList.join(`${randomNumber}@`);
    }

}

export default data;



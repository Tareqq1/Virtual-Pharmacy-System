# Olayan-Pharmacy
An implementation of a full-stack web application. The application is a platform to serve 3 types of users: Patients, Pharmacists and Admins. It was built using using the `MERN` stack.
This website compromises a part of the functionality of a Clinic-Pharmacy web application where the Clinic repository is [here](https://medium.com/@ibrahimabouelanin/a-software-engineering-team-wants-to-share-with-you-their-experience-16175a0cfe9a)
## Motivation
In the realm of healthcare, accessibility and convenience play pivotal roles in ensuring the well-being of individuals. The concept of an online pharmacy stems from a deep-seated commitment to transforming and enhancing the way people access essential medications and healthcare services. The motivation behind creating an online pharmacy is rooted in addressing several key aspects of healthcare delivery such as efficiency, accessibility and convenience.
## Badges
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
[![React.js](https://img.shields.io/badge/React.js-18.2-blue.svg?logo=react&logoColor=white)](https://reactjs.org/)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
[![Mongoose](https://img.shields.io/badge/Mongoose-v7.5.4-green.svg)](https://mongoosejs.com/)


## Build Status 🔨
-   More UI improvements needed to improve user experience.
-   A better caching layer needs to be added to the application to allow different tabs of the ame web browser to store different information as different sessions.
-   A message broker needs to be added to the application to handle asynchronous tasks such as sending emails and notifications.
-   Implementing a Testing structure using **jest** to test end points

## Code Style 📜
The code of the web application is enforced using eslint and prettier

## Screenshots 🖵
<details>
<summary>Login</summary>

![image](https://github.com/advanced-computer-lab-2023/Olayan-Pharmacy/assets/87617743/e79a4757-ab28-4a9a-9ed1-44e48de2f9cd)

    
</details>

<details>
<summary>Register</summary>

![image](https://github.com/advanced-computer-lab-2023/Olayan-Pharmacy/assets/87617743/6d9343b6-ecf5-4205-9e7a-31f176954b59)

</details>

<details>
<summary>Patient - Store</summary>

![image](https://github.com/advanced-computer-lab-2023/Olayan-Pharmacy/assets/87617743/55610ebb-1cd7-4fb1-a1a2-94672bc1cffb)

</details>

<details>
<summary>Pharmacist - Drug/Medicine Management</summary>

![image](https://github.com/advanced-computer-lab-2023/Olayan-Pharmacy/assets/87617743/020783d8-04ac-4999-8a44-c716385aaecb)
</details>

<details>
<summary>Pharmacist/Admin - Sales Report</summary>

![image](https://github.com/advanced-computer-lab-2023/Olayan-Pharmacy/assets/87617743/ebff4e19-53f7-4df5-8835-6be95f727264)

</details>

<details>
<summary>Pharmacist - Pharmacist Home</summary>

![image](https://github.com/advanced-computer-lab-2023/Olayan-Pharmacy/assets/87617743/ff8fbbef-a5e0-405e-9526-c8b0f333fd48)

</details>

<details>
<summary>Admin - User Management</summary>

![image](https://github.com/advanced-computer-lab-2023/Olayan-Pharmacy/assets/87617743/b56fd78f-e961-467a-8815-dad320be9707)

</details>


## Tech/Framework used 🧰
-   [React](https://reactjs.org/)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Material-UI](https://material-ui.com/)
-   [Git](https://git-scm.com/)
-   [Stripe](https://stripe.com/)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
-   [Postman](https://www.postman.com/)
-   [VSCode](https://code.visualstudio.com/)
-   [Express_File-Upload](https://www.npmjs.com/package/express-fileupload)
-   [NodeMailer](https://nodemailer.com/about/)

## Features ✨
The system serves different type of users (Patient, Pharmacist & Admin)
<details>
    
 <summary> As an Admin I can </summary>

- Login with Username & Password
- Logout 
- Change my password
- reset a forgotten password through OTP
- View a total sales report based on a chosen month

</details>

<details>

<summary> As A patient I can </summary>

- Login with Username & Password
- Logout 
- Change my password
- add an over the counter medicine to my cart
- Add a perscription medicine based on my perscription
- View cart items
- Remove an item from the cart
- Change the amount of item in a cart
- Checkout my order
- Add a new delivery address (or multiple addresses)
- Choose a delivery address from the delivery address available
- Choose to pay with wallet, credit card or cash on delivery
- View current and past orders
- View order details and status
- Cancel an order
- View alternatives to a medicine that is out of stock based on main active ingredient
- View the amount in my wallet
- Chat with a pharmacist
- Receive a notification once a medicine is out of stock on the system and via email

 </details>

<details>

<summary> As a Pharmacist I can </summary>
- Login with username and password
- Logout
- Change my password
- Reset a forgotten password through OTP sent to email
- View a total sales report based on a chosen month
- Filter sales report based on a medicine/date
- Chat with a doctor
- View the amount in my wallet
- Receive a notification once a medicine is out of stock on the system and via email




</details>

## Code Examples 🐱‍💻

<details>
    <summary>
    Send OTP
    </summary>

```javascript
const nodemailer = require('nodemailer');

const generateOTP = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        const otp = Math.floor(100000 + Math.random() * 900000) + ""; // Generate a random 6-digit OTP

        // Send the OTP to the user's email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "seifkandel3@gmail.com", // Your Gmail email address
                pass: "c x o d r z b m d n u s y f p r", // Your Gmail password or App Password
            },
        });

        const mailOptions = {
            from: "seifkandel3@gmail.com",
            to: user.email,
            subject: "Your One Time Password (OTP)",
            text: `Your OTP is: ${otp}`,
        };

        transporter.sendMail(mailOptions);

        return res.json({ otp, user_id: user._id });
    } catch (error) {
        return res.status(500).json({ error: err.message });
    }
};

```


</details>

<details>
    <summary>
        Pharmacist Actions on Medicine (fetch, search, update)
    </summary>

```javascript
const viewAllMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.find().sort({ createdAt: -1 });
        return res.status(200).json(medicine);

    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}
```

```javascript
// filter medicine using substring of name
const filterMedicineName = async (req, res) => {
    //const { name } = req.params;
    const { name } = req.body;
    //console.log(name)
    try {
        const medicine =await Medicine.find({
            name: { $regex: name, $options: "i" }
        }).sort({ createdAt: -1 });
        
        return res.status(200).json(medicine);

    }catch (e) {
        return res.status(400).json({ error: e.message });
    }
}
```

```javascript
const updateMedicine = async (req, res) => {
    const { id } = req.params;
    const medicine = await Medicine.findById(id);
    if (!medicine) {
        return res.status(404).json({ error: "Medicine not found" });
    }
    try {
        const { name, price, quantity, active_ingredients, description, medicinal_use} = req.body;
        const medicine = await Medicine.findByIdAndUpdate(id, {
            name,
            price,
            quantity,
            active_ingredients,
            description,
            medicinal_use,
        });
        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        if(!name){
            throw Error("Please enter medicine name")
        }
        if(price == 0){
            throw Error("Please enter medicine price")
        }
        if(!active_ingredients){
            throw Error("Please enter medicine active ingredients")
        }
        if(!description){
            throw Error("Please enter medicine description")
        }
        if(!medicinal_use){
            throw Error("Please enter medicine medicinal use")
        }
        
        return res.status(200).json(medicine);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
};
```

</details>

<details>
    <summary>
        Login & Register for pharmacist
    </summary>

```javascript
// Register as a pharmacist
const registerNewPharmacist = async (req, res) => {
    try {
        const {
            username,
            password,
            name,
            email,
            date_of_birth,
            hourly_rate,
            affiliated_hospital,
            educational_background,
        } = req.body;

        const exists = await User.findOne({username})

        if(exists) {
            throw Error("Username already exists")
        }

        // if (!validator.isEmail(email)) {
        //     throw Error('Email not valid')
        // }

        if (!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough')
        }

        /*
        const exists2 = await this.findOne({ email })

        if (exists2) {
            throw Error('Email already in use')
        }
        */

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const pharmacist = new Pharmacist({
            name,
            email,
            date_of_birth,
            hourly_rate,
            affiliated_hospital,
            educational_background,
        });

        const user = new User({
            username,
            password : hash,
            email: email,
            pharmacist: pharmacist._id,
        });

        const { national_id_document, pharmacy_degree_document, licenses } = req.files;
        console.log(national_id_document)
        console.log(pharmacy_degree_document)
        console.log(licenses)
        if(!national_id_document || !pharmacy_degree_document || !licenses){
                throw Error('Please upload all necessary files')
        }
        const stringID = "" + pharmacist._id;

        const nationalIDPath = `./user-files/pharmacists-files/${stringID.slice(
            -7
        )}-${national_id_document.name}`;

        const degreePath = `./user-files/pharmacists-files/${stringID.slice(
            -7
        )}-${pharmacy_degree_document.name}`;

        //console.log(nationalIDPath)
        //console.log(degreePath)
        await national_id_document.mv(nationalIDPath, function (err) {
            if (err) {return res.status(500).send(err)};
        });
        //console.log("national ID done")
        await pharmacy_degree_document.mv(degreePath, function (err) {
            if (err) return res.status(500).send(err);
        });

        if (!Array.isArray(licenses)) {
            let licensePath = `./user-files/pharmacists-files/${stringID.slice(
                -7
            )}-${licenses.name}`;
        //console.log(licensePath)


            await licenses.mv(licensePath, function (err) {
                if (err) return res.status(500).send(err);
            });
            pharmacist.licenses.push(licensePath);
        } else {
            licenses.forEach(async (license) => {
                let licensePath = `./user-files/pharmacists-files/${stringID.slice(
                    -7
                )}-${license.name}`;

                await license.mv(licensePath, function (err) {
                    if (err) return res.status(500).send(err);
                });
                pharmacist.licenses.push(licensePath);
            });
        }

        pharmacist.pharmacy_degree_document = degreePath;
        pharmacist.national_id_document = nationalIDPath;
    


        

        await user.save();
        await pharmacist.save();

        return res.status(201).json({user, pharmacist});
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err.message });
    }
};

```
```javascript
//Login
const login = async (req, res) => {
    const { username, password } = req.body;
    
    try{
        const user = await User.findOne({ username});

        if (!user) {
            throw Error("User does not exist");
        }

        if(user.pharmacist){
            const pharmacist = await Pharmacist.findById(user.pharmacist);
            if(pharmacist.registration_request_status == "pending"){
                throw Error("Your Registration Request is Still Pending");
            }
            if(pharmacist.registration_request_status == "rejected"){
                throw Error("Your Registration Request has been Rejected");
            }
        }
    
        const match = await bcrypt.compare(password, user.password);

        //const role_id = user.patient || user.pharmacist || user.doctor;
        
        if (!match) {
            throw Error("Invalid password");
        }

        const token = createToken(user._id);
        
        res.status(200).json({ token, user, msg: "SUCCESS" });
    }
    catch(e){
        return res.status(400).json({ error: e.message });
    }

    
};
```javascript
</details>

<details>
    <summary>
        Update Medicine Component
    </summary>
```javascript
import { useEffect, useState } from "react";
import { useMedicineContext } from "../hooks/useMedicineContext";
const UpdateMedicineForm = ({medicine}) => {

    const { dispatch } = useMedicineContext();
    const [updateName, setUpdateName] = useState('')
    const [updatePrice, setUpdatePrice] = useState(0)
    const [updateQuantity, setUpdateQuantity] = useState(0)
    const [updateActive_ingredients, setUpdateActive_ingredients] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')
    const [updateMedicinal_use, setUpdateMedicinal_use] = useState('')
    const [error, setError] = useState(null)
    const [isUpdated, setIsUpdated] = useState(false)

    const handleUpdateMedicine = async (e) => {
        e.preventDefault();
        console.log(medicine._id)
        const med = {
            name: updateName,
            price: updatePrice,
            quantity: updateQuantity,
            active_ingredients: updateActive_ingredients,
            description: updateDescription,
            medicinal_use: updateMedicinal_use
        };
        console.log(med)
        const response = await fetch(`/pharmacist/updateMedicine/${medicine._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(med)
        });
        const json = await response.json();
        if(!response.ok){
            console.log(json.error);
            setError(json.error);
        }
        if(response.ok){
            dispatch({type: 'UPDATE_MEDICINE', payload: medicine});
            setUpdateName('');
            setUpdatePrice(0);
            setUpdateQuantity(0);
            setUpdateActive_ingredients('');
            setUpdateDescription('');
            setUpdateMedicinal_use('');
            setError(null)
            setIsUpdated(false)
            alert("Medicine Updated Successfully");
            console.log("Medicine Updated Successfully");
        }
    }

    return (
        
            
            
        <div>
            <button onClick={()=>setIsUpdated(!isUpdated)}>Toggle Update Medicine</button>
            {isUpdated?<form>
                            <h3>Update Medicine Form</h3>
                            
                            <label>Medicine name</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdateName(e.target.value)}
                                value={updateName}
                            />
                            <label>Price</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdatePrice(e.target.value)}
                                value={updatePrice}
                            />
                            <label>Quantity</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdateQuantity(e.target.value)}
                                value={updateQuantity}
                            />
                            <label>Active Ingredients</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdateActive_ingredients(e.target.value)}
                                value={updateActive_ingredients}

                            />
                            <label>Description</label>
                            <input
                                type="text"
                                onChange={(e) => setUpdateDescription(e.target.value)}
                                value={updateDescription}
                            />
                            <label>Medicinal Use</label>
                            <input

                                type="text"
                                onChange={(e) => setUpdateMedicinal_use(e.target.value)}
                                value={updateMedicinal_use}
                            />
                            
                            
                            <button onClick={(e) => { handleUpdateMedicine(e) }}>Submit Update</button>
                            {error && <div className="error">{error}</div>}
                        </form>: null}

        </div>
        

    )
}

export default UpdateMedicineForm;
```
</details>

## Tests
Tests were done manually using **postman** as well as **logging**
This project however went through other types of tests like end-to-end testing and user acceptance testing

## Installation 📥

Install my-project with `npm`

```bash
> git clone https://github.com/advanced-computer-lab-2023/Olayan-Pharmacy
> cd Olayan-Pharmacy/
> cd backend
> cd src && npm i
> cd..
> cd..
> cd frontend
> cd src && npm i -f && cd -
```

## How to use

To run backend 
```bash
cd backend
cd src && nodemon server
```
To run frontend
```bash
cd frontend
cd src && npm start
```
the backend server and client will be running on the specified ports on your env files.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

<details>
    <summary>
        envs
    </summary>


`PORT`
`MONGO_URI`
`SECRET`
`STRIPE_PRIVATE_KEY`

**PORT** is your port number.
**MONGO_URI** is your mongodb connection string and **SECRET** is the password to be placed in that string.
</details>

## Optimizations
-     Asynchronous programming was used.
-     React Context API was used.
## API Routes
All API Routes are in the **ROUTES** file in the root folder in this repository.
## Contributing

We welcome and appreciate contributions from the community, as they play a crucial role in the growth and improvement of this project. Whether you are a developer, designer, tester, or documentation enthusiast, your input is valuable. Before you start contributing, please take a moment to review the guidelines outlined in this section.

### How to Contribute

1. **Fork the Repository:**

    - Fork the repository to your GitHub account.
    - Clone the forked repository to your local machine.

    ```bash
    git clone https://github.com/your-username/project.git
    cd project
    ```

2. **Create a Branch:**

    - Create a new branch for your contribution.

    ```bash
    git checkout -b feature/your-feature
    ```

3. **Make Changes:**

    - Implement your changes or additions to the project.
    - Ensure that your code adheres to the established [code style](#code-style).

4. **Commit Changes:**

    - Commit your changes with clear and concise messages.

    ```bash
    git add .
    git commit -m "Add your commit message here"
    ```

5. **Push to Your Fork:**

    - Push your changes to your GitHub repository.

    ```bash
    git push origin feature/your-feature
    ```

6. **Create a Pull Request:**
    - Go to the GitHub page of your forked repository.
    - Create a new pull request, detailing the changes you made and the purpose of the pull request.
    - Mention any issues your pull request addresses.

If you have questions, concerns, or suggestions, feel free to open an issue or reach out to the project maintainers. Healthy communication is key to a collaborative and inclusive development environment.

## Credits

-   [Node.js docs](https://nodejs.org/en/docs/)
-   [Mongoose docs](https://mongoosejs.com/docs/)
-   [Express docs](https://expressjs.com/en/4x/api.html)
-   [React docs](https://reactjs.org/docs/getting-started.html)
-   [Material UI docs](https://mui.com/material-ui/getting-started/)
-   [Tailwind CSS docs](https://tailwindcss.com/docs/installation)

## License

MIT License

Copyright (c) 2023 Olayan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

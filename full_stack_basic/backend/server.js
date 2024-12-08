import express from 'express'; //this is module js importing 
const app = express();

app.get('/', (req, res) => {
    res.send("Server is now READY for you");
})

app.get('/api/cars', (req, res) => {
    // get a list of 5 luxury car
    const luxury_car = [
        {
            id: 1,
            title: "car1",
            content: "Rolls-Royce Phantom"
        },
        {
            id: 2,
            title: "car2",
            content: "Mercedes-Maybach S-Class"
        },
        {
            id: 3,
            title: "car3",
            content: "Bentley Continental GT"
        },
        {
            id: 4,
            title: "car4",
            content: "Aston Martin DB11"
        },
    ];
    res.send(luxury_car);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});

// there are two importing method as modulejs or commonjs
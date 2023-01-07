import React, {useState} from 'react';
import axios from 'axios';
import "./OMS_Front.css"

function Practice() {
    const [text, setText] = useState([]);

    const [orders, setorders] = useState({
        company_name: "",
        product_name: "",
        product_code: "",
        price: "",
        quantity: "",
        sum: "",
        due_date: "",
    });

    const handleChange = e => {
        setorders({
            ...orders,
            [e.target.name]: e.target.value,

        })

    }

    const handleSubmit = () => {
        axios.post('http://localhost:8000/', {
            company_name: orders.company_name,
            product_name: orders.product_name,
            product_code: orders.product_code,
            price: orders.price,
            quantity: orders.quantity,
            sum: orders.price * orders.quantity,
            due_date: orders.due_date,
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            })
        // e.preventDefault()
        // alert(JSON.stringify(orders, null, 2))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="company_name"
                    value={orders.company_name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="product_name"
                    value={orders.product_name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="product_code"
                    value={orders.product_code}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    value={orders.price}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="quantity"
                    value={orders.quantity}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="due_date"
                    value={orders.due_date}
                    onChange={handleChange}
                />
                <button type="submit">완료</button>
            </form>

            <h1> 연습</h1>
            <div className="btn-primary">
                {/*<button onClick={() => {*/}
                {/*    axios.post("http://127.0.0.1:8000/", {*/}
                {/*        company_name: "테스트",*/}
                {/*        product_name: "제품이름",*/}
                {/*        product_code: "제품 코드",*/}
                {/*        price: "2",*/}
                {/*        quantity: "123",*/}
                {/*        sum: "246",*/}
                {/*        due_date: "2022-12-31",*/}
                {/*    }).then(function (response) {*/}
                {/*        console.log(response);*/}
                {/*    })*/}
                {/*        .catch(function (error) {*/}
                {/*            console.log(error);*/}
                {/*        })*/}
                {/*}}>*/}
                {/*    POST*/}
                {/*</button>*/}
                <button onClick={() => {
                    axios.get("http://127.0.0.1:8000/")
                        .then((response) => {
                            setText([...response.data]);
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }}>
                    GET
                </button>
            </div>
            {text.map((e) => (
                <div>
                    {" "}
                    <div className="list">
                        <span>
                            {e.id}번, {e.company_name}, {e.product_name}, {e.product_code}, {e.price}, {e.quantity}, {e.sum},
                            {e.due_date}
                        </span>
                        <button className="btn-delete"
                                onClick={() => {
                                    axios.delete(`http://localhost:8000/${e.id}`)
                                    setText(text.filter((text) => text.id !== e.id))
                                }}>
                            DELETE
                        </button>
                        {" "}
                    </div>
                </div>
            ))}
        </>
    )
}

export default Practice;
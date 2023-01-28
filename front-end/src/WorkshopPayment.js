import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm(state , {Received}) {
    const [ Loading, setLoading ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const Navigate = useNavigate()

    const Location = state.state
    console.log(Location)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            setLoading(true);
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:3001/payment", {
                amount: Location.total*100,
                id,
                name : Location.name+" for Workshop "+Location.wn,
            })

            if(response.data.success) {
                axios.put("http://localhost:3001/addEnrollment" , { wn : Location.wn, type : Location.type , id : Location.id , name : Location.name , mobile : Location.mobile , email : Location.email , total : Location.total }).then(
                ()=>{
                    setLoading(false);
                    Navigate("/Confirmed" , { state: {status: Location.status, name : Location.name , user:Location.email , type:Location.type , id:Location.id}});
                    alert("Order Placed");
                }
            )
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <div>
        {!Loading ? 
        <form onSubmit={handleSubmit} className="container form-div">
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="final-button-cc">Pay</button>
        </form>
        :
        <div className='loader-main'>
            <div className="loader"></div>
            <p className='loader-text'>Confirming Order</p>
        </div>
        }
            
        </div>
    )
}

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./interestCalc.css";

const interestData = yup.object({
    currency: yup.string(),
    initInvest: yup.number(),
    monthContrib: yup.number(),
    invLength: yup.number().integer(),
    rate: yup.number()
})

const InterestCalc = () => {

   const [result, setResult] = useState(false);

    const { control: data, register, reset: resetCreate, handleSubmit: handleSubmitCreate, setValue: setValueCreate, formState: { errors: errorsCreate } } = useForm({
        resolver: yupResolver(interestData)
    });

    function calculate(data) {
        let result = 0;
        for(let i = 1; i <= data.invLength; i++) {
            if(i === 1) {
                result += (data.initInvest * (1 + data.rate / 100)) + data.monthContrib;
            } else {
                result = (result * (1 + data.rate / 100)) + data.monthContrib;
            }
        }
        result.toFixed(2);
        if(data.currency === "U$") {
            result = result.toLocaleString("en-US", {style: "currency", currency: "USD"});
        } else {
            result = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
        }
        setResult(result);
    }

    function resetForm() {
        resetCreate();
        setResult(false);
    }

    return(
        <div id="interest-calculator">
            <div id="interest-calculator-form">
                <form className="interest-calculator" onSubmit={handleSubmitCreate(calculate)}>
                    <label id="currency-label">Select your currency:</label>
                    <select id="currency" required {...register("currency")}>
                        <option value="U$">U$</option>
                        <option value="R$">R$</option>
                    </select>
                    <label className="label-calc">Initial Investment </label>
                    <input type="number" step="0.01" min={0} {...register("initInvest")} />
                    <label className="label-calc">Monthly Contribution</label>
                    <input type="number" step="0.01" min={0} {...register("monthContrib")} />
                    <label className="label-calc" >Interest Rate (%)</label>
                    <input type="number" step="0.01" min={0} {...register("rate")} />
                    <label className="label-calc">Investment Lengh (Months)</label>
                    <input type="number" min={0} {...register("invLength")} />
                    <button type="submit" className="calc-button">Calculate</button>
                    <button type="button" className="calc-button" onClick={() => resetForm()}>Reset</button>
                </form>
                { result && <div className="result">
                    <p>Ending Balance:</p>
                    <p>{ result }</p>
                </div>    
                }
            </div>
        </div>
    );
}

export default InterestCalc;
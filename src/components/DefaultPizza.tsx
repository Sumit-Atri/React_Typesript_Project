
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import UpdatePizza from "./UpdatePizza";

export interface Pizza {
    id: number;
    name: string;
    toppings: string[];
    fanFavorite: string;
    delivery: string;
  }

export interface DefaultPizza {
    pizzaname: string;
    fanfavorite: string;
    delivery: { value: string; label: string };
    [topping: string]: boolean | string | { value: string; label: string };
  }

  

function PizzaDetail()
{

    
    const [PizzaData, setPizzaData] = useState<Pizza>([]);
    const id = useParams()['id'];

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get<Pizza>(`http://localhost:3000/pizzas/${id}`);
              
              console.log(response.data);
              setPizzaData(response.data);
            } catch (error) {
              console.error("Error fetching pizza data:", error);
            }
          };
      fetchData();
    }, []); 

let deliveryValue: string = PizzaData.delivery === 'Yes' ? '1' : '0';
let deliveryLabel: string = PizzaData.delivery === 'Yes' ? 'Yes' : 'No';

    const defaultPizza: DefaultPizza = {
        pizzaname: PizzaData.name,
        fanfavorite: PizzaData.fanFavorite,
        delivery: { value: deliveryValue, label: deliveryLabel }
         
        
      };

    
    if(typeof PizzaData.toppings !== "undefined")
    {
        PizzaData.toppings.forEach(topping => {
            defaultPizza[topping] = true;
          });
    }
      

    

   

    return PizzaData ? <UpdatePizza defaultPizza={defaultPizza} id = {id}/> : <div>Loading...</div>

}

export default PizzaDetail;
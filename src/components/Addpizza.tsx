import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import axios from 'axios';


export interface FormData {
  pizzaname: string;
  pepperoni: boolean;
  mushrooms: boolean;
  onions: boolean;
  sausage: boolean;
  olives: boolean;
  fanfavorite: string;
  delivery: {
    label: string;
    value: string};
}

export interface newPizza 
{
  name: string;
  toppings: string[];
  fanFavorite: string;
  delivery: string;
}


const validationSchema = yup.object({
    pizzaname: yup.string().required('Missing Pizza Name'),
    //Toppings: yup.string().required('Missing Toppings'),
    //Toppings: {checked: yup.array().min(1, 'Select atleast one option of your interest') },
    fanfavorite: yup.string().required('Missing Fan Favorite'),
    //delivery: yup.string().required('Missing Delivery')
    delivery: yup.object().shape({
      label: yup.string().required("Is required"), 
      value: yup.string().required("Is required")
    })
  }).required()

const Addpizza: React.FC = () => {
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const { register, handleSubmit, formState: { errors }, setError, control } = useForm
    ({
        resolver: yupResolver(validationSchema),
        defaultValues: {
          pizzaname: '',
          fanfavorite: '',
          delivery: ''
        }
      });
    
      const toppings: string[] =  ["pepperoni", "mushrooms", "onions", "sausage", "olives"];
      
      console.log('errors', errors)
    
    
      const onSubmit = (data: FormData) => {
        const selectedToppings = [];
        // Loop through the data object to find selected toppings
        for (const [key, value] of Object.entries(data)) {
          // If the value is not false, it means the topping is selected
          if (value !== false && toppings.includes(value)) {
            // Add the topping name to the selectedToppings array
            selectedToppings.push(key);
          }
        }
      
        // Create a new pizza object with only the selected toppings
        const newPizza: newPizza = {
          //id: dataJson.length + 1, // Generate a new ID for the pizza
          name: data.pizzaname,
          toppings: selectedToppings,
          fanFavorite: data.fanfavorite,
          delivery: data.delivery.value === "1" ? 'Yes' : 'No'
        };
      
        // Add the new pizza to the data.json array
       console.log(newPizza);
       axios.post('http://localhost:3000/pizzas', newPizza)
       .then(response => {
         console.log('POST request successful:', response.data);
         window.location.href = '/';
       })
       .catch(error => {
         console.error('Error posting data:', error);
       });
      }
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Pizza Name</label>
            <input {...register('pizzaname')} type="text" className="form-control" />
            {errors.pizzaname && (
              <span className="error">{errors.pizzaname.message}</span>
            )}
          </div>
          <div className="field">
          <label className="label">Topping</label>
    
          <div className="toppings-container">
            {
    
          toppings.map(
            (c,i) => <label key={c}><input type="checkbox" value={c} name="sameName" {...register(c)} className="form-check-input" />{c}</label>
            //checked={selectedToppings.includes(c)} onChange={handleCheckboxChange}
          )
            
            }
            </div>
            
          </div>
          <div className="field">
            <label className="label">Fan Favorite</label>
            <div>
              <input type="radio" value="Yes" {...register("fanfavorite")} />
              Yes
            </div>
            <div>
              <input type="radio" value="No" {...register("fanfavorite")} />
              No
            </div>
            {errors.fanfavorite && (
              <span className="error">{errors.fanfavorite.message}</span>
            )}
    
    
          </div>
    
          <div className="field">
            <label className="label">Delivery</label>
            <Controller
              control={control}
              name="delivery"
              render={({ field }) => (
                <Select
                name = "my-delivery"
                  {...field}
                  options={[
                    { value: '1', label: 'Yes' },
                    { value: '0', label: 'No' }
                  ] as { value: string; label: string }[]}
                />
              )}
            />
            {errors.delivery && (
              <span className="error">{errors.delivery.message}</span>
            )}
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Add Pizza
            </button>
          </div>
        </form>
        </div>
      </div>
      
    </div>
        
      );
    
      
    };
    
    
    export default Addpizza;
    
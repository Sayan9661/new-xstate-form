// Purpose: This file contains the code for the form page. It is the main page of the application.

//use in client side
'use client';

import React from 'react';
import { useMachine } from '@xstate/react';
// import formMachine from './machines/myFormMachine';
import formMachine from '../../machines/myFormMachine';

import { useForm } from 'react-hook-form';


const MultiStepForm = () => {
  
  // hook to use react-hook-form
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  
  // hook to use the machine
  const [current, send] = useMachine(formMachine);

  

  const handleNext = (data) => {
    send({ type: 'NEXT', data });
  };
  const handleSurvey = (data) => {
    console.log(data);
    send({ type: 'UPDATE_ANSWER', data });
  };
  const handlePrevious = () => {
    send('PREVIOUS');
  };


//user info component
  const renderUserInfo = () => (
    <div>
      <h2
      class="text-4xl font-extrabold dark:text-white text-center"
      >User Information</h2>
      <form onSubmit={handleSubmit(handleNext)}>
        <div class="p-3">
        <div class="p-2">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="FirstName">First Name:</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            id="FirstName"
            {...register('FirstName', { required: 'Name is required' })}
          />
          {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div class="p-2">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="LastName">Last Name:</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            id="LastName"
            {...register('LastName', { required: 'Name is required' })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div class="p-2">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="email">Email:</label>
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        </div>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
          disabled={!formState.isValid}
        >Next</button>
      </form>
    </div>
  );


//survey component
const renderSurvey = () => {
  const questions = [
    {
      question: 'What is your favorite color?',
      options: ['Red', 'Blue', 'Green', 'Yellow'],
    },
    {
      question: 'Which programming language do you prefer?',
      options: ['JavaScript', 'Python', 'Java', 'C++'],
    },
    {
      question: 'What is your favorite animal?',
      options: ['Dog', 'Cat', 'Elephant', 'Lion'],
    },
  ];

  return (
    <div>
      <h2
        class="text-4xl font-extrabold dark:text-white text-center"
        data-testid="survey-title"
      >Survey</h2>
      <form onSubmit={handleSubmit(handleSurvey)}>
        <div class="p-3">
        {questions.map((q, index) => (
          <div
            class="p-2"
            key={index}>
            <label>{q.question}</label>
            {q.options.map((option, optionIndex) => (
              <div
                class="pt-1"
                key={optionIndex}>
                <input
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  type="radio"
                  id={`option-${index}-${optionIndex}`}
                  value={option}
                  {...register(q.question, { required: true })}
                />
                <label
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor={`option-${index}-${optionIndex}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        {errors.survey && <span>{errors.survey.message}</span>}
        <div class="flex flex-row p-2">
            <button
            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
            type="button"
            onClick={handlePrevious}>
            Previous
        </button>
            <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
            disabled={!formState.isValid}>
          Next
            </button>
          </div>
        </div>
      </form>
    </div>
    );
  };


  //confirmation component
  const renderConfirmation = () => {
    console.log(current.context);
    console.log(current.context.survey.data);
    return (
      <div>
        <h2
          class="text-4xl font-extrabold dark:text-red-500"
        >Confirmation</h2>
        {/* <p>Name: {current.context.FirstName}</p>
        <p>Name: {current.context.LastName}</p>
        <p>Email: {current.context.email}</p>
        <p>Survey:</p> */}
        <div class="p-3">
        <ul class="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
          {Object.entries(current.context.survey).map((key, index) => (
            // console.log(key, index),
            <li
              key={index}
              class="flex items-center"
            >
              <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              {key[0]} : {key[1]}
            </li>
          ))}
          </ul>
        </div>
        <div class="flex flex-row p-2">
        <button
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"

          type="button"
          onClick={handlePrevious}>
          Previous
        </button>
        <button
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          type="submit"
          onClick={handleSubmit(handleNext)} disabled={!formState.isValid}>
          Confirm
          </button>
          </div>
      </div>
      
    );
  };


  return (
    <div class="flex h-screen justify-center items-center">
      {current.matches('userInfo') && renderUserInfo()}
      {current.matches('survey') && renderSurvey()}
      {current.matches('confirmation') && renderConfirmation()}
      
    </div>
    
  );
};

export default MultiStepForm;
import React from 'react';


interface FormTypes {
    name: string;
    email: string;
    isLoading: boolean;
    onsubmit: (event: React.FormEvent) => void;
    nameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    emailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form = ({ name, email, onsubmit, nameChange, emailChange, isLoading }: FormTypes) => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-md border border-slate-800 rounded-lg p-6 shadow-md bg-white">
                <form className="flex flex-col space-y-4">
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        onChange={nameChange}
                        value={name}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        onChange={emailChange}
                        value={email}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="submit"
                        onClick={onsubmit}
                        value={isLoading ? 'Loading...' : 'Submit'}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mt-4 rounded cursor-pointer"
                    />
                </form>
            </div>
        </div>
    );
};

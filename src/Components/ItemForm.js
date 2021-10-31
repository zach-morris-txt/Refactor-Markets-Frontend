//Imports
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { axiosWithAuth } from '../Utils/axiosWithAuth';
import { addItem } from '../Actions/index';


//Form State
const initialItem = {
	item_name: '',
	item_description: '',
	item_location: '',
};


//Item Form
function NewItem(props) {
	const [newItem, setNewItem] = useState(initialItem);
	const { dispatch } = props;

	const handleChange = e => {
		setNewItem({
			...newItem,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axiosWithAuth()
			.post(`https://markets-backend.herokuapp.com/api/items/user/${props.userId}`, newItem)
			.then(res => {
				dispatch(addItem(newItem));
				setNewItem(initialItem);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className="newItem">
			<div className="builder">
				<h2>Add A New Item!</h2>
				<form onSubmit={handleSubmit} id="item-form">
                    <label>
						{' '}
						Name
						<input
							type="text"
							name="item_name"
							id="item_name-input"
							value={newItem.item_name}
							onChange={handleChange}
						/>
					</label>
                    <label>
						{' '}
						Description
						<input
							type="text"
							name="item_description"
							id="item_description-input"
							value={newItem.item_description}
							onChange={handleChange}
						/>
					</label>
					<label>
						{' '}
						Location
						<input
							type="text"
							name="item_location"
							id="item_location-input"
							value={newItem.item_location}
							onChange={handleChange}
						/>
					</label>
					<div className="submit">
						<button id="newItem-button">Add Item!</button>
					</div>
				</form>
			</div>
		</div>
	);
}


//Pass State
const mapStateToProps = state => {
	return {
		...state,
		itemData: state.itemData,
		isLoggedIn: state.isLoggedIn,
		userId: state.userId
	};
};


//Exports
export default connect(mapStateToProps)(NewItem);
//Imports
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { startEditing, cancelUpdate, updateItem, deleteItem } from '../Actions/index';
import { axiosWithAuth } from '../Utils/axiosWithAuth';


//Item
function Item(props) {
	const { item, dispatch, key } = props;
	const [itemToEdit, setItemToEdit] = useState(item);

	const handleChange = e => {
		setItemToEdit({
			...itemToEdit,
			[e.target.name]: e.target.value
		});
	};

	const handleStartEditing = () => {
		dispatch(startEditing());
	};

	const handleUpdateSubmit = e => {
		e.preventDefault();
		axiosWithAuth()
			.put(`https://markets-backend.herokuapp.com/api/items/${itemToEdit.item_id}`, itemToEdit)
			.then(res => {
				dispatch(updateItem(itemToEdit));
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleDelete = () => {
		console.log('working');
		axiosWithAuth()
			.delete(`https://markets-backend.herokuapp.com/api/items/${props.userId}/${item.item_id}`)
			.then(res => {
				console.log(res);
				const newItemData = props.itemData.filter(data => data.item_id !== item.item_id);
				dispatch(deleteItem(newItemData));
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleCancelUpdate = () => {
		dispatch(cancelUpdate());
	};

	return (
		<div className="card-container" key={key}>
			<h3>{item.item_owner}</h3>

			{props.isEditing ? (
				<>
					<form id="itemCardInfo">
                        <label>
                            {' '}
                            Name
                            <input
                                type="text"
                                name="item_name"
                                id="item_name-input"
                                value={itemToEdit.item_name}
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
                                value={itemToEdit.item_description}
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
                                value={itemToEdit.item_location}
                                onChange={handleChange}
                            />
                        </label>
						<button id="updateBtn" onClick={handleUpdateSubmit}>Update</button>
						<button id="cancelBtn" onClick={handleCancelUpdate}>Cancel</button>
					</form>
				</>
			) : (
				<div className="itemWrapper">
					<ul>
						<li>
							<p>Name: {item.item_name}</p>
						</li>
						<li>
							<p>Description: {item.item_description}</p>
						</li>
						<li>
							<p>Location: {item.item_location}</p>
						</li>
					</ul>
					<div className="btnWrapper">
						<button id="editBtn" onClick={handleStartEditing}>Edit</button>
						<button id="deleteBtn" onClick={handleDelete}>Delete</button>
					</div>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		...state,
		itemData: state.itemData,
		isLoggedIn: state.isLoggedIn,
		isEditing: state.isEditing,
		userId: state.userId
	};
};

export default connect(mapStateToProps)(Item);
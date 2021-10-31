//Imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NewItem from './ItemForm';
import Item from './Item';
import { fetchItems } from '../Actions/index';


//Dashboard
function Dashboard(props) {
	const { itemData, dispatch } = props;

	useEffect(() => {
		dispatch(fetchItems());
		// eslint-disable-next-line
	}, []);

	return (
		<div className='item-panel'>
			<NewItem />
			<div className="scroll">
				<div className="cardHeader">
					<h2>Item Cards</h2>
				</div>
				<div className="itemCard">
					{itemData.map(item => {
						return <Item key={Math.random()} item={item} />;
					})}
				</div>
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
export default connect(mapStateToProps)(Dashboard);

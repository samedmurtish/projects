import { useState } from "react";

interface Properties{
	items: string[],
	listName: string,
	onSelect: (item:string) => void
}

function ListGroup({items, listName, onSelect}: Properties)
{
	const [selectedIndex, setSelectedIndex] = useState(-1);

	const sortItems = () => {
		return items.map((value, valueIndex) => 
		<li 
		key={valueIndex}
		className={selectedIndex == valueIndex ? 'list-group-item active' : 'list-group-item'} 
		onClick={() => {setSelectedIndex(valueIndex); onSelect(value)}}
		>{value}</li>)
	};
	
	return(
		<>
			<ul className="list-group text-center">
				<h1>{listName}</h1>
				{sortItems()}
			</ul>
		</>
	)
	
}

export default ListGroup
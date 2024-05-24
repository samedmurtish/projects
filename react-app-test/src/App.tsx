import ListGroup from './ListGroup'

function App() {

	const itemsList = ['1','2','3','4','5']

	const handleSelect = (item:string) => {
		console.log(item);
	};

	return (
		<>
			<ListGroup items={itemsList} listName='Test List !' onSelect={handleSelect} />
		</>
	)
}

export default App

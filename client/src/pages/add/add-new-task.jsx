import NarBar from "../../components/narbar";
import AddNew from "../../components/Add-todo"
const Add = (props) => {
	return (
		<div>
			<NarBar {...props} />
            <AddNew {...props}/>
		</div>
	)
}

export default Add
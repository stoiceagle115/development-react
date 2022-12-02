// TODO: create a component that displays a single bakery item
export default function BakeryItem(props) {


    const handleClick = () => {
        props.setItems([...props.items, props.name])
        props.updatePrice(props.totalPrice + props.price)
        props.updateCount(props.count + props.price)
    }

    const removeClick = () => {
        subFromList()
    }

    const subFromList = () => {
        // make deep copy of old list; add the item
        const newList = props.items.filter(fixItems)
        // set the state of the list to the updated copy
        props.setItems(newList);

        //count = 0.00;
    }

    const fixItems = item => {
        if (item !== props.name) {
            return true
        } else {
            props.updatePrice(props.totalPrice - props.price)
            return false
        }
    }

    return (
        <div class="BakeryItem">
            <h3>{props.name}</h3>
            <h4>Type: {props.type}</h4>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <img src={props.image} width="200rem" height="150rem"></img>
            <br></br>
            <button onClick={handleClick} class="button">Add Item</button>
            <button onClick={removeClick} class="button">Remove All</button>
        </div>
    );
}

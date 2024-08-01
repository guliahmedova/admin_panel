
const MyCustomImageEditingComponent = (props) => {

    return (
        <div>
           <img src={`/images/${props.image}`} alt="" />
        </div>
    )
}

export default MyCustomImageEditingComponent;
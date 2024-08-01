import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import moment from 'moment';


const CarCard = ({ name, image, price, carCreatedDate }) => {
    return (
        <div>
            <Card className='mb-5'>
                <CardImg top src={`/images/${image}`} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardSubtitle>{price}<strong>$</strong> </CardSubtitle>
                    <CardText> <strong>Car Year:</strong> {moment(carCreatedDate).format('L')}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default CarCard
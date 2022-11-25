import React from 'react';
import Card, { CardBody } from '../../../components/bootstrap/Card';


const SubCards = ({ title, content }) => {
    return (
        <Card className='m-5'>
            <CardBody>
                <div className='m-3'>
                    <h2 className='' style={{'margin':'3rem 0rem'}}>
                        {title}
                    </h2>
                    <h3 className='text-center' style={{'margin':'3rem 0rem'}}>
                        {content}
                    </h3>
                </div>
            </CardBody>
        </Card>
    );
}

export default SubCards;
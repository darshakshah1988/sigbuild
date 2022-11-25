import React from 'react';
import SubCards from './HomePageCards/SubCards';


const HomePageCard = () => {
    return (
        <div className='d-flex'>
            <div className='d-flex flex-column justify-content-around'>
                {/* <div className='d-flex justify-content-between' style={{ 'border': '2px solid red' }}> */}
                <div className='d-flex'>
                    <SubCards title={"Total Co-Workers"} content={"546"} />
                    <SubCards title={"Total Contacts"} content={"546"} />
                    <SubCards title={"Total Interests"} content={"546"} />
                    <SubCards title={"Total Departments"} content={"546"} />
                </div>
                <div className='d-flex'>
                    <SubCards title={"No. of Co-Worker not assigned to Department"} content={"546"} />
                    <SubCards title={"No. of Contacts not assigned to Interest"} content={"546"} />
                </div>

                {/* </div> */}
            </div>
        </div>
    )
}

export default HomePageCard;
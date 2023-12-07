import DynamicTable from './DynamicTable';

const Q5 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5em' }}>Номер помещения и этаж</h1>
            <DynamicTable endpoint="5" />
        </div>
    );
}

export default Q5;
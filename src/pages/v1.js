import DynamicTable from './DynamicTable';

const V1 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5em' }}>Все помещения в корпусе А</h1>
            <DynamicTable endpoint="1" />
        </div>
    );
}

export default V1;
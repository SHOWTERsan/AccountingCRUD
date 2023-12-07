import DynamicTable from './DynamicTable';

const V2 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5em' }}>Количество помещений в корпусах</h1>
            <DynamicTable endpoint="2" />
        </div>
    );
}

export default V2;
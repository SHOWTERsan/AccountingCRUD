import DynamicTable from './DynamicTable';

const Q3 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5em' }}>Первые 10 помещений</h1>
            <DynamicTable endpoint="3" />
        </div>
    );
}

export default Q3;
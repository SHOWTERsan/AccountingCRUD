import DynamicTable from './DynamicTable';

const V3 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5em' }}>Общая информация о факультетах</h1>
            <DynamicTable endpoint="3" />
        </div>
    );
}

export default V3;
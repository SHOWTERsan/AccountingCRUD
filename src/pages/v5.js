import DynamicTable from './DynamicTable';

const V5 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5em' }}>Количество корпус у факультетов</h1>
            <DynamicTable endpoint="5" />
        </div>
    );
}

export default V5;
import DynamicTable from './DynamicTable';

const Q4 = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.5em' }}>Владения факультета</h1>
            <DynamicTable endpoint="4" />
        </div>
    );
}

export default Q4;
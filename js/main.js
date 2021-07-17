async function get_plot(){

    let dates = [];
    let closing_prices_bse = [];
    let closing_prices_nse = [];

    const response = await fetch("https://raw.githubusercontent.com/shashank524/Consultex/master/BSE.csv");

    const data = await response.text();

    const rows = data.split("\n").slice(1, -1); // Getting the rows     and Deleting the first row
    var count = 0;
    rows.forEach(elt => {
        
        const row = elt.split(',');

        let date = row[0];
        // dates.push(date.slice(0,4));
        let Close = Number(row[5]);
        if ((count % 12) == 0){
            dates.push(date.slice(0,4));
            closing_prices_bse.push(Close);
        }
        // closing_prices_bse.push(Close);
        count += 1;

    });
    console.log(closing_prices_bse.length);
    // Getting NSE data

    const response_2 = await fetch("https://raw.githubusercontent.com/shashank524/Consultex/master/NSE.csv");
    const data_2 = await response_2.text();
    const rows_2 = data_2.split("\n").slice(1, -1); // Getting the rows     and Deleting the first row

    var count = 0;
    rows_2.forEach(elt => {
        const row = elt.split(',');

        // let date = row[0];
        // dates.push(date);
        let Close = Number(row[4]);
        if ((count % 12) == 0) {
            closing_prices_nse.push(Close);
        }
        // closing_prices_nse.push(Close);
        count += 1;
    });
    console.log(closing_prices_nse.length);

    var ctx = document.getElementById('myChart1').getContext('2d');
    var index_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'BSE Sensex',
                data: closing_prices_bse,
                fill: true,
                lineTension: 0.5,     
                backgroundColor: [
                    'rgba(104, 242, 169, 0.2)',
                ],
                borderColor: [
                    'rgba(104, 242, 169, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Nifty50',
                data: closing_prices_nse,
                fill: true,
                lineTension: 0.5,
                backgroundColor: [
                    'rgba(4, 191, 253, 0.2)',
                ],
                borderColor: [
                    'rgba(4, 191, 253, 1)',
                ],
                borderWidth: 1
            }
        ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });    
    
}
var callAxios = axios.create();

$(document).ready(function () {
    $("#landingPage").modal('show');
});



function dashboardAdmin() {
    // Graphs
    const canvas = document.getElementById('myChart')
    
    let myChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            datasets: [
                {
                    data: [3, 5, 8, 13, 21, 13],
                    lineTension: 0,
                    backgroundColor: 'transparent',
                    borderColor: '#ff40ff',
                    borderWidth: 4,
                    pointBackgroundColor: '#ff40ff',
                    label: 'Banho'
                },
                {
                    data: [0, 0, 1, 1, 2, 5],
                    lineTension: 0,
                    backgroundColor: 'transparent',
                    borderColor: '#007bff',
                    borderWidth: 4,
                    pointBackgroundColor: '#007bff',
                    label: 'Tosa'
                },
                {
                    data: [5, 8, 13, 8, 5, 3],
                    lineTension: 0,
                    backgroundColor: 'transparent',
                    borderColor: '#66ff',
                    borderWidth: 4,
                    pointBackgroundColor: '#66ff',
                    label: 'Veterinário'
                }
            ]
        },
        options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false
                }
              }]
            },
            legend: {
              display: true
            }
        }
    });
}

function relatorioListarPet() {
    let table = new Tabulator('#table_pet', {
        layout: 'fitColumns',
        ajaxURL: '/exampledata/ajaxprogressive',
        pagination: 'local',
        paginationSize: 20,
        paginationSizeSelector: [10, 20, 30, 50, 80, 130],
        movableColumns: true,
        columns: [
            { title: 'Pet', field: 'pet' },
            { title: 'Raça / Espécie', field: 'raca' },
        ]
    });

    table.on('rowClick', (oEvent, oRow) => {
        $('#petModal').modal('show');
        this.onTableRowClick(oRow);
    });
}

function relatorioListarClientes() {
    let table = new Tabulator('#table_clientes', {
        layout: 'fitColumns',
        ajaxURL: '/exampledata/ajaxprogressive',
        pagination: 'local',
        paginationSize: 20,
        paginationSizeSelector: [10, 20, 30, 50, 80, 130],
        movableColumns: true,
        columns: [
            { title: 'Nome', field: 'nome', headerFilter: 'input' },
            { title: 'Pet', field: 'pet', headerFilter: 'input' },
            { title: 'Raça', field: 'raca', headerFilter: 'input' },
            { title: 'Telefone', field: 'telefone', headerFilter: 'input' },
            { title: 'Ativo', field: 'ativo', headerFilter: 'tickCross',  headerFilterParams: { tristate: true }, headerFilterEmptyCheck: (value) => {return value === null} }
        ]
    });

    table.on('rowClick', (oEvent, oRow) => {
        $('#clienteModal').modal('show');
        this.onTableRowClick(oRow);
    });
}

function relatorioListarFuncionarios() {
    let table = new Tabulator('#table_funcionarios', {
        layout: 'fitColumns',
        ajaxURL: '/services/listarFuncionarios',
        pagination: 'local',
        paginationSize: 20,
        paginationSizeSelector: [10, 20, 30, 50, 80, 130],
        movableColumns: true,
        columns: [
            { title: 'Nome', field: 'nome', headerFilter: 'input' },
            { title: 'Serviço', field: 'servico', headerFilter: 'input' },
            { title: 'Telefone', field: 'telefone', headerFilter: 'input' },
            { title: 'Férias?', field: 'trabalhando', headerFilter: 'tickCross',  headerFilterParams: { tristate: true }, headerFilterEmptyCheck: (value) => {return value === null} },
            { title: 'Ativo', field: 'ativo', headerFilter: 'tickCross',  headerFilterParams: { tristate: true }, headerFilterEmptyCheck: (value) => {return value === null} }
        ]
    });

    table.on('rowClick', (oEvent, oRow) => {
        $('#funcionarioModal').modal('show');
        this.onTableRowClick(oRow);
    });    
}

function relatorioListarRacas() {
    let table = new Tabulator('#table_racas', {
        layout: 'fitColumns',
        ajaxURL: '/services/listarRacas',
        placeholder: 'Nenhuma Raça encontrada',
        pagination: 'local',
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        responsiveLayout: 'hide',
        movableColumns: true,
        columns: [
            { title: 'Nome', field: 'nome', responsive: 0 },
            { title: 'Descrição', field: 'descricao', responsive: 1 },
            { title: 'Tamanho', field: 'tamanho', responsive: 1 },
            { title: 'Ativo', field: 'ativo', formatter: 'tickCross', responsive: 1 }
        ]
    });

    table.on('rowClick', (oEvent, oRow) => {
        $('#servicoModal').modal('show');
        this.onTableRowClick(oRow);
    });
}

function relatorioListarServicos() {
    let table = new Tabulator('#table_servicos', {
        layout: 'fitColumns',
        ajaxURL: '/services/listarServicos',
        placeholder: 'Nenhum serviço encontrado',
        pagination: 'local',
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        responsiveLayout: 'hide',
        movableColumns: true,
        columns: [
            { title: 'Serviço', field: 'nome', responsive: 0 },
            { title: 'Descrição', field: 'descricao', responsive: 1 },
            { title: 'Cor', field: 'cor', formatter: 'color', responsive: 2 },
            { title: 'Ativo', field: 'ativo', formatter: 'tickCross', responsive: 1 }
        ]
    });

    table.on('rowClick', (oEvent, oRow) => {
        $('#servicoModal').modal('show');
        this.onTableRowClick(oRow);
    });
}

function relatorioListarCalendarios() {
    let table = new Tabulator('#table_calendarios', {
        layout: 'fitColumns',
        ajaxURL: '/services/listarCalendarios',
        placeholder: 'Nenhum calendário encontrado',
        pagination: 'local',
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        columns: [
            { title: 'Nome', field: 'nome' },
            { title: 'Segunda', field: 'segunda', formatter: 'tickCross' },
            { title: 'Terça', field: 'terca', formatter: 'tickCross' },
            { title: 'Quarta', field: 'quarta', formatter: 'tickCross' },
            { title: 'Quinta', field: 'quinta', formatter: 'tickCross' },
            { title: 'Sexta', field: 'sexta', formatter: 'tickCross' },
            { title: 'Sábado', field: 'sabado', formatter: 'tickCross' },
            { title: 'Domingo', field: 'domingo', formatter: 'tickCross' },
            { title: 'Horário', field: 'horario' },
            { title: 'Ativo', field: 'ativo', formatter: 'tickCross' }
        ]
    });

    table.on('rowClick', (oEvent, oRow) => {
        $('#calendarioModal').modal('show');
        this.onTableRowClick(oRow);
    });
}

function onTableRowClick(oRow) {
    const dados = oRow.getData();

    for (let key in dados) {
        let input = $('#' + key)[0] || undefined;
        let value = dados[key];

        if (input) {
            if (input.getAttribute('role') === 'switch') {
                input.checked = value;
            } else {
                input.value = value;
            }
        }
    }   // for (let key in dados)

    habilitarBotaoExluir(dados.id);
}   // onTableRowClick(oRow)

function habilitarBotaoExluir(id) {
    let button = $('#excluirButton')[0];
    if (id.length > 0) {
        button.hidden = false;
    } else {
        button.hidden = true;
    }
}

async function onClickExcluirServico() {
    let id = $('#id')[0];
    callAxios.delete(`/admin/excluirServico`, { params: { ID: id.value } });

    $('#servicoModal').modal('hide');
    
    let table = findTable();
    if (table) {
        await table.setData(table.getAjaxUrl());
    }
}

async function onClickExcluirCalendario() {
    let id = $('#id')[0];
    callAxios.delete(`/admin/excluirCalendario`, { params: { ID: id.value } });

    $('#calendarioModal').modal('hide');
    
    let table = findTable();
    if (table) {
        await table.setData(table.getAjaxUrl());
    }
}

async function onClickExcluirRaca() {
    let id = $('#id')[0];
    callAxios.delete(`/admin/excluirRaca`, { params: { ID: id.value } });

    $('#racaModal').modal('hide');
    
    let table = findTable();
    if (table) {
        await table.setData(table.getAjaxUrl());
    }
}

function findTable(id = 'table_') {
    let findId = $(`[id^=${id}]`)[0].id || '';
    return findId.length > 0 ? Tabulator.findTable(`#${findId}`)[0] || undefined : undefined;
}

function calendarioAgendamento() {
    let calendar = $('#calendario')?.fullCalendar({
        header: {
            left: 'title',
            center: 'agendaDay,agendaWeek,month',
            right: 'prev,next today'
        },
        editable: true,
        selectable: true,
        firstDay: 1,
        defaultView: 'month',
        axisFormat: 'hh:mm',
        columnFormat: {
            month: 'ddd',       // Mon
            week: 'ddd dd',     // Mon 07
            day: 'dddd dd/MM',  // Monday 09/07
            agendaDay: 'dddd d'
        },
        titleFormat: {
            month: 'MMMM yyyy', // September 2009
            week: "MMMM yyyy", // September 2009
            day: 'MMMM yyyy'   // Tuesday, Sep 8, 2009
        },
        allDaySlot: false,
        selectHelper: true,
        select: (id, start, end, allDay) => {
            $('#agendamentoModal').modal('show');
            calendar.fullCalendar('unselect');
        },
        droppable: false,
        events: [],
    });
}

function limparFormularioCEP() {
    $('#logradouro')?.val('');
    $('#bairro')?.val('');
    $('#cidade')?.val('');
    $('#uf')?.val('');
    $('#ibge')?.val('');
}

function validarCEP(cep = '') {
    let sCEP = cep.replace(/\D/g, '');

    if (sCEP != '') {
        //Expressão regular para validar o CEP.
        let validaCEP = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validaCEP.test(sCEP)) {
            $('#logradouro')?.val('...');
            $('#bairro')?.val('...');
            $('#cidade')?.val('...');
            $('#uf')?.val('...');
            $('#ibge')?.val('...');

            $.getJSON('https://viacep.com.br/ws/'+ cep +'/json/?callback=?', function(dados) {
                if (!('erro' in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $('#logradouro')?.val(dados.logradouro);
                    $('#bairro')?.val(dados.bairro);
                    $('#cidade')?.val(dados.localidade);
                    $('#uf')?.val(dados.uf);
                    $('#ibge')?.val(dados.ibge);
                } else {
                    //CEP pesquisado não foi encontrado.
                    limparFormularioCEP();
                    alert('CEP não encontrado.');
                }
            });
        }
    } else {
        limparFormularioCEP();
    }   // if (sCEP != '')
}   // function validarCEP(cep = '')

$(document).ready(() => {
    
    $('#atualizarRelatorio')?.on('click', async function () {
        let table = findTable();
        await table.setData(table.getAjaxUrl());
    })

    $('#exportarRelatorio')?.on('click', function () {
        findTable()?.download('xlsx', 'relatorio.xlsx', {sheetName:"Relatorio"});
    })

    $('#cep')?.blur(function () {
        validarCEP($(this).val());
    })

}); // $(document).ready
var callAxios = axios.create();

function relatorioListarClientes() {
    let table = new Tabulator('#table_clientes', {
        layout: 'fitColumns',
        ajaxURL: '/exampledata/ajaxprogressive',
        pagination: 'local',
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        columns: [
            { title: 'Nome', field: 'nome'},
            { title: 'Pet', field: 'pet' },
            { title: 'Raça', field: 'raca' },
            { title: 'Telefone', field: 'telefone' }
        ]
    });
}

function relatorioListarFuncionarios() {
    let table = new Tabulator('#table_funcionarios', {
        layout: 'fitColumns',
        ajaxURL: '/services/listarFuncionarios',
        pagination: 'local',
        paginationSize: 6,
        paginationSizeSelector: [3, 6, 8, 10],
        movableColumns: true,
        columns: [
            { title: 'Nome', field: 'nome'},
            { title: 'Serviço', field: 'servico' },
            { title: 'Telefone', field: 'telefone' },
            { title: 'Trabalhando', field: 'trabalhando' },
            { title: 'Ativo', field: 'ativo' }
        ]
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

$(document).ready(() => {
    
    $('#atualizarRelatorio')?.on('click', async function () {
        let table = findTable();
        await table.setData(table.getAjaxUrl());
    })

    $('#exportarRelatorio')?.on('click', function () {
        findTable()?.download('xlsx', 'relatorio.xlsx', {sheetName:"Relatorio"});
    })
});


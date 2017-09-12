var places = ['bilabial','labio-dental','alveolar','retroflex','palatal',
                'velar','uvular','glottal'];
var manners = ['nasal','plosive','fricative','approximant'];
var voices = ['default','unvoiced','voiced','lateral','aspirated','ejective']

function makeCategoryRow(category,heading,label='label'){
    string = '<tr><th class="heading">' + heading + '</th>';
    category.forEach(function(element){
        string += '<th class="' + label + ' ' + element + '">' + element + '</th>';
    });
    return string + '</tr>';
};

function makeIPATable(){
    var string = '<thead>' + makeCategoryRow(places,'') + '</thead>';
    string += '<tbody>';
    var k = 0;
    for(var i=0;i<manners.length;i++){
        string += '<tr><th class ="label ' + manners[i] + '">' + manners[i] + '</th>';
        for(var j=0;j<places.length;j++){
            string += '<td class="' + manners[i] + ' ' + places[j] + '">';
            while(k < consonants.length && consonants[k].place === places[j]){
                string += ' <span class="' + consonants[k].voicing + '">' 
                string += consonants[k].symbol + '</span>';
                k += 1;
            }
            string += '</td>'
        }
        string += '</tr>'
    }
    return string + '</tbody>';
};

function updateHighlightedClasses(clicked=false){
    if(clicked || $('.added').length !== 0){
        $('.highlight,.has-item').removeClass('highlight has-item');
        $('.added').each(function(){
            $(this).parent().attr('class').split(' ').forEach(function(category){
                $('.'+category).addClass('highlight');
            });
            $(this).parent().addClass('has-item');
        });
    } else {
        $('.label.highlight').each(function(){
            var category = $(this).attr('class').split(' ')[1]
            $('.'+category).addClass('highlight');
        });
    }
};

function showCollapsed(){
    $('#IPA-table').find('th,td').show();
    $('.label').not('.highlight').each(function(){
        var category = $(this).attr('class').split(' ')[1]
        $('#IPA-table').find('.'+category).hide()
    });
};

$(document).ready(function(){
    $('table#IPA-table').append(makeIPATable());
    $('table#places').append(makeCategoryRow(places,'places'));
    $('table#manners').append(makeCategoryRow(manners,'manners'));
    $('table#voicings').append(makeCategoryRow(voices,'voicing','voicing'));
    
    $('.voicing.default').addClass('chosen');
    $('span').not('.default').hide();
    
    $('span').on('click',function(){
        $(this).toggleClass('added');
        updateHighlightedClasses(true);
    });
    
    $('.label').on('click',function(){
        var category = $(this).attr('class').split(' ')[1];
        if($(this).hasClass('highlight')){
            $('.'+category).removeClass('highlight has-item');
            $('.'+category+'>span').removeClass('added');
            updateHighlightedClasses();
        } else {
            updateHighlightedClasses();
            $('.'+category).addClass('highlight');
        }
        if($('#expander').hasClass('collapsed')){
            showCollapsed();
        }
    });
    
    $('#expander').on('click',function(){
        if($(this).hasClass('collapsed')){
            $('#IPA-table').find('th,td').show();
            $(this).removeClass('collapsed');
        } else {
            showCollapsed();
            $(this).addClass('collapsed');
        }
    });
    
    $('.voicing').on('click',function(){
        $(this).toggleClass('chosen');
        $('span').hide();
        $('.chosen').each(function(){
            var category = $(this).attr('class').split(' ')[1];
            if($(this).hasClass('chosen')){
                $('span.'+category).show();
            }
        });
    });
});
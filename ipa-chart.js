var places = ['bilabial','labio-dental','alveolar','retroflex','palatal',
                'velar','uvular','pharyngeal','glottal'];
var manners = ['nasal','plosive','fricative','approximant'];
var features = ['default','voiceless','voiced','lateral','aspirated','ejective',
                'prenasalized','implosive', 'tap','trill']

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
                string += ' <span class="' + consonants[k].feature + '">' 
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
    $('.has-item').removeClass('has-item');
    if(clicked || $('.added').length !== 0){
        $('.highlight').removeClass('highlight');
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
    $('table#features').append(makeCategoryRow(features,'features','features'));
    
    $('.features.default').addClass('chosen');
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
    
    $('.features').on('click',function(){
        $(this).toggleClass('chosen');
        $('span').show();
        $('.features').not('.chosen,.default').each(function(){
            var category = $(this).attr('class').split(' ')[1];
            $('span.'+category).hide();
        });
        if($('.features.default').hasClass('chosen')){
            $('span.default').show();
        }
        $(':hidden').removeClass('added');
        updateHighlightedClasses();
    });
});
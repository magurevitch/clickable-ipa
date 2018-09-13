var places = ['bilabial','labio-dental','alveolar','sibilant-alveolar','post-alveolar','palato-alveolar','retroflex','sibilant-retroflex','palatal',
                'velar','uvular','pharyngeal','glottal'];
var manners = ['nasal','plosive','fricative','approximant'];
var voicings = ['default','voiceless','voiced','aspirated','ejective',
                'prenasalized','implosive']
var features = ['tap', 'lateral', 'trill']

function makeCategoryRow(category,heading,label='label'){
    string = '<tr><th class="heading">' + heading + '</th>';
    category.forEach(function(element){
        string += '<th class="' + label + ' ' + element + '">' + element + '</th>';
    });
    return string + '</tr>';
};

function makeSuperclass(supername, classes) {
    return '<th class="' + classes.join(' ') + '" colspan=' + classes.length + '>' + supername + '</th>';
};

function makeIPATable(){
    var string = '<thead><tr><th></th>' +  makeSuperclass('labial',places.slice(0,2)) + makeSuperclass('coronal',places.slice(2,8)) + makeSuperclass('dorsal',places.slice(8,11)) + makeSuperclass('radical',places.slice(11,13)) +'</tr>' + makeCategoryRow(places,'') + '</thead>';
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
    $('table#voicings').append(makeCategoryRow(voicings,'voicings','voicings'));
    $('table#features').append(makeCategoryRow(features,'features','features'));
    
    $('.voicings.default').addClass('chosen');
    $('span').not('.default').hide();
    $('span.tap,span.trill,span.lateral').hide();
    
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
    
    $('.voicings,.features').on('click',function(){
        $(this).toggleClass('chosen');
        $('span').show();
        $('.voicings').not('.chosen,.default').each(function(){
            var category = $(this).attr('class').split(' ')[1];
            $('span.'+category).hide();
        });
        if($('.voicings.default').hasClass('chosen')){
            $('span.default').show();
        }
        $('.features').not('.chosen').each(function(){
            var category = $(this).attr('class').split(' ')[1];
            $('span.'+category).hide();
        });
        $(':hidden').removeClass('added');
        updateHighlightedClasses();
    });
});
// --------------------------------------
// autodictunpack.js :: lysdexic 2020
//
// automagically script the arguments 
// to parse a dictionary with dict.unpack
// --------------------------------------

inlets = 1;
outlets = 1;
var thedictunpack;
var d = new Dict();
ourself = this.box; // assign a Maxobj to our js object
var thedict;

function findmydictview(object)
{
	if (object.maxclass == 'dict.view') object.varname = 'mydictview';		
	else return true;
}

function go(args)
{
	var unpackargs = [];
	// what are the dtypes for the values in of our dict?
	keys = d.getkeys();
	for (i in keys)
	{
		post(keys[i], '\n');
		// fill array with arguments for our dict.unpack
		if (d.gettype(keys[i]) !== 'null') unpackargs.push(keys[i]+":");
	}
	
	post(thedict);
	// make x/y location for our new subpatcher
	const sploc_x = thedict.rect[0];
	const sploc_y = thedict.rect[1] + 70;
	const loc_x = 50;
	const loc_y = 150;
	
	// let's hide this massive dictunpack away in a subpatcher to keep the parent clean
	subpatch = this.patcher.newdefault(sploc_x, sploc_y, "p", thedict.varname + "unpacker");
	in1 = subpatch.subpatcher().newobject("inlet", 50, 90, 35, 0)
	// make dict.unpack with new args
	thedictunpack = subpatch.subpatcher().newdefault(loc_x, loc_y, "dict.unpack", unpackargs);
	//connect our new inlet to our dict.unpack
	subpatch.subpatcher().connect(in1, 0, thedictunpack, 0);
	// give it a variable name so we can find it by name
	thedictunpack.varname = thedict.varname + '.unpacker';
	
	// let's find out where our dict.view is so we can place some UI objects next to it in the parent (this) patcher
	this.patcher.apply(findmydictview);
	dictview = this.patcher.getnamed('mydictview');
	const dvloc_x = dictview.rect[2] + 5;
	const dvloc_y = dictview.rect[1];

	valobjs = [];
	parentvalobjs = [];
	comments = [];
	parentcomments = [];
	pattrfwds = [];
	var i = 0;
	for (key in unpackargs)
	{
		// slice off the colon we added before
		unpackargs[key] = unpackargs[key].slice(0, -1);
		valtype = d.gettype(unpackargs[key]);
		post(d.name, 'key ', key, ":", unpackargs[key], d.get(unpackargs[key]), valtype, '\n');
		var nulled = false;
		switch(valtype)
		{
			case('int'):
				valobjs[i] = subpatch.subpatcher().newdefault(loc_x+(i*70), loc_y+40, "number");
				pattrfwds[i] = subpatch.subpatcher().newdefault(loc_x+(i*70), loc_y - 220, "pattrforward", "parent::"+unpackargs[key]+'box');
				subpatch.subpatcher().connect(thedictunpack, i, valobjs[i], 0);
				subpatch.subpatcher().hiddenconnect(thedictunpack, i, pattrfwds[i], 0);
				parentvalobjs[i] = this.patcher.newdefault(dvloc_x, dvloc_y+(i*20), 'number');
				parentvalobjs[i].varname = unpackargs[key]+'box';
				parentvalobjs[i].rect = [parentvalobjs[i].rect[0],parentvalobjs[i].rect[1], parentvalobjs[i].rect[0] + 270, parentvalobjs[i].rect[1]];
				parentcomments[i] = this.patcher.newdefault(dvloc_x + 270, dvloc_y+(i*20), 'comment');
				parentcomments[i].rect = [parentcomments[i].rect[0],parentcomments[i].rect[1], parentcomments[i].rect[0] + 160, parentcomments[i].rect[1]];
				parentcomments[i].set(unpackargs[key]);
				break;
			case('float'):
				valobjs[i] = subpatch.subpatcher().newdefault(loc_x+(i*70), loc_y+40, "flonum");
				pattrfwds[i] = subpatch.subpatcher().newdefault(loc_x+(i*70), loc_y - 220, "pattrforward", "parent::"+unpackargs[key]+'box');
				subpatch.subpatcher().connect(thedictunpack, i, valobjs[i], 0);
				subpatch.subpatcher().hiddenconnect(thedictunpack, i, pattrfwds[i], 0);
				parentvalobjs[i] = this.patcher.newdefault(dvloc_x, dvloc_y+(i*20), 'flonum');
				parentvalobjs[i].varname = unpackargs[key]+'box';
				parentvalobjs[i].rect = [parentvalobjs[i].rect[0],parentvalobjs[i].rect[1], parentvalobjs[i].rect[0] + 270, parentvalobjs[i].rect[1]];
		                parentcomments[i] = this.patcher.newdefault(dvloc_x + 270, dvloc_y+(i*20), 'comment');
				parentcomments[i].rect = [parentcomments[i].rect[0],parentcomments[i].rect[1], parentcomments[i].rect[0] + 160, parentcomments[i].rect[1]];
				parentcomments[i].set(unpackargs[key]);
				break;
			case('symbol'):
				valobjs[i] = subpatch.subpatcher().newdefault(loc_x+(i*70), loc_y+40, "message");
				pattrfwds[i] = subpatch.subpatcher().newdefault(loc_x+(i*70), loc_y - 220, "pattrforward", "parent::"+unpackargs[key]+'box');
				prepend = subpatch.subpatcher().newdefault(loc_x+(i*70), loc_y - 190, "prepend", "set");
				subpatch.subpatcher().connect(thedictunpack, i, valobjs[i], 1); // << rh cold inlet 
				subpatch.subpatcher().hiddenconnect(thedictunpack, i, prepend, 0);
				subpatch.subpatcher().hiddenconnect(prepend, 0, pattrfwds[i], 0);
				parentvalobjs[i] = this.patcher.newdefault(dvloc_x, dvloc_y+(i*20), 'message');
				parentvalobjs[i].varname = unpackargs[key]+'box';
				parentvalobjs[i].rect = [parentvalobjs[i].rect[0],parentvalobjs[i].rect[1], parentvalobjs[i].rect[0] + 270, parentvalobjs[i].rect[1]];
				parentcomments[i] = this.patcher.newdefault(dvloc_x + 270, dvloc_y+(i*20), 'comment');
				parentcomments[i].rect = [parentcomments[i].rect[0],parentcomments[i].rect[1], parentcomments[i].rect[0] + 160, parentcomments[i].rect[1]];
				parentcomments[i].set(unpackargs[key]);
				break;
			case('null'):
				nulled = true;
				break;
			default:
				post("unexpected dtype: ", d.gettype(unpackargs[key])); 
				nulled = true;
				break;
		}	
		if(!nulled)
		{
			comments[i] = subpatch.subpatcher().newdefault(loc_x+(i*70), loc_y+80, "comment", d.gettype(unpackargs[key]));
			comments[i].set(unpackargs[key]);
			comments[i].rect = [(loc_x+(i*70)), loc_y+80, (loc_x+((i+1)*70)-5), 700];
			comments[i].setattr('bubble', 1);
			comments[i].setattr('bubbleside', 0);
			comments[i].setattr('bubbleusescolors', 1);
			comments[i].setattr('textjustification', 1);
			i += 1;
		}
	}
	thedictunpack.rect = [loc_x, loc_y, (loc_x+unpackargs.length*70), loc_y]
	this.patcher.connect(thedict, 0, subpatch, 0);
	subpatch.subpatcher().locked = 1;  
	thedict.message('bang');
	
}


function anything()
{
	thedict = ourself.patchcords.inputs[0].srcobject;
	post(thedict.maxclass);
	var args = arrayfromargs(arguments);
	// find the object we're connected to and ensure it's a dictionary
	if (thedict.maxclass == 'dict')
	{
		//associate the dictionary object in this script with the dictionary we're connected to
		d.name = thedict.getattr('name');
		
		//if we haven't provided a varname, let's set it to the dict's name
		if(thedict.varname == "")
		{
			const dictname = thedict.getattr('name');
			thedict.varname = thedict.getattr('name') == "" ? "YourDict" : thedict.getattr('name');
			post('Setting varname for connected dict to :',thedict.varname, '\n');
		}
		post("Processing :", thedict.varname, '\n');
		go();
	} else {
		post("Connect me to third outlet of a dict...\n");
	}		
}

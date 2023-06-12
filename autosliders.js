// -------------------------------------------
// dictslidergen.js :: lysdexic 2021
//
// automagically script in some sliders and
// connect them up to a dict.unpack (or route)
// -------------------------------------------

inlets = 1;
outlets = 2;
sliderWidth = 90;

ourself = this.box; // assign a Maxobj to our js object

function anything()
{
	var a = arrayfromargs(messagename, arguments);
	post("received list " + a + "\n");
	var subpname = a.shift();
	
    // make x/y location for our new subpatcher
	const sploc_x = ourself.rect[0];
	const sploc_y = ourself.rect[1] + 70;
	const loc_x = 50;
	const loc_y = 150;
	
	// create a subpatcher
	subpatch = this.patcher.newdefault(sploc_x, sploc_y, "p", subpname);
	in1 = subpatch.subpatcher().newobject("inlet", 50, 50, 35, 0)
    //thedictunpack = subpatch.subpatcher().newdefault(loc_x, loc_y, "dict.unpack", unpackargs);
	router = subpatch.subpatcher().newdefault(loc_x, loc_y, "route", a);
    //connect our new inlet to our dict.unpack
	subpatch.subpatcher().connect(in1, 0, router, 0);
	// give it a variable name so we can find it by name
	router.varname = subpname + "_router";
	
	var r = new Array();
	r[0] = router.rect[0]; r[1] = router.rect[1];
    r[2] = ((a.length + 1) * 70); r[3] = router.rect[3];
	router.rect = r;

	var subp_outs = [];
	var live_slds = [];
	var i = 0;
	
	for (key in a) {
		// create an outlet for each key
		subp_outs[i] = subpatch.subpatcher().newdefault(loc_x+(i*70), loc_y+100,"outlet");
		// set the outlet assist
		subp_outs[i].setattr("comment", a[key]);
		subpatch.subpatcher().connect(router, i, subp_outs[i], 0);
		live_slds[i] = this.patcher.newdefault(sploc_x + (i*sliderWidth), sploc_y+30, "live.slider", "@varname", a[key]);
		var r = new Array();
		r[0] = live_slds[i].rect[0]; r[1] = live_slds[i].rect[1];
    	r[2] = live_slds[i].rect[0] + sliderWidth; r[3] = live_slds[i].rect[3];
		live_slds[i].rect = r;
		this.patcher.connect(subpatch, i, live_slds[i], 0);
		live_slds[i].setattr("_parameter_unitstyle",1);
		live_slds[i].setattr("_parameter_range",[0,1]);
		i++;
    }
	var r = new Array();
	r[0] = subpatch.rect[0]; r[1] = subpatch.rect[1];
    r[2] = sploc_x + (i*sliderWidth); r[3] = subpatch.rect[3];
	subpatch.rect = r;

	
	
	// jump outside the subpatcher
	// create a live.slider for each
	
}

//function anything()
//{
//	destobj = ourself.patchcords.outputs[0].dstobject;
	
	
//	if(destobj.maxclass == "route") 
//    {
		// get args from object!
//		post(destobj.getboxattr("boxatoms"));
//		return
//    }
//	post(destobj.maxclass,"not a valid object");
	
	
	
//}


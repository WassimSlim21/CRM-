const Pack = require('../models/pack');
const User = require('../models/user');

exports.getAll = (req, res, next) => {
	Pack.find().then(packs => {
		res.send(packs);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}
/*
Add Pack
Exemple 
{
  "id": "1",
  "pack_name": "STARTER",
  "socialAccounts": "{'max_have':'4','deletes':'4'}",
  "users": 2,
  "benchmarks": "{'max_have':'2','deletes':'2'}",
  "created_at": null,
  "updated_at": null,
  "annualSubscription": 165,
  "maxFansNumber": 300000,
  "dataHistoryYears": "2 YEARS",
  "dashboard": true,
  "audienceInsights": true,
  "trendengagementreports": true,
  "customBenchmark": true,
  "nationalReports": false,
  "competitorContentCuration": true,
  "emailReports": true,
  "brandingDesign": true,
  "mouthlySubcription": 215,
  "addPage": 33,
  "addUser": 17,
  "addBenchmark": 66
}
*/
exports.createPack = (req, res, next) => {

	var pack = new Pack(req.body);
	pack.save().then(data => {
		return res.status(201).json({ success: true, msg: 'Successful created new Pack', pack: data });  //creation successfull
	}).catch(err => {
		console.log(err)
		return res.status(403).json({ err: err });
	});

}
/*
Delete Pack
*/
exports.deletePack = (req, res, next) => {
	Pack.deleteOne({ _id: req.params.id }).then(
		() => {

			res.status(201).json({
				message: 'Pack Deleted !'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
}
/*
 Get Pack by Id
  */
exports.getPack = (req, res, next) => {
	Pack.findById(req.params.id).then(pack => {
		User.find({ pack: req.params.id}).then(users => {
			res.send({pack, users});
		})
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	});
}


/*
Update Pack 
*/

exports.updatePack = (req, res, next) => {
	pack = new Object();
	console.log(req.body);

	if (req.body.pack_name)
		{pack.pack_name = req.body.pack_name;}

	if (req.body.users)
		{pack.users = req.body.users;}

	if (req.body.annualSubscription)
		{pack.annualSubscription = req.body.annualSubscription;}

	if (req.body.maxFansNumber)
		{pack.maxFansNumber = req.body.maxFansNumber;}

	if (req.body.dataHistoryYears)
		{pack.dataHistoryYears = req.body.dataHistoryYears;
}

		pack.dashboard = req.body.dashboard;
		pack.audienceInsights = req.body.audienceInsights;
		pack.trendengagementreports = req.body.trendengagementreports;
		pack.customBenchmark = req.body.customBenchmark;
		pack.nationalReports = req.body.nationalReports;
		pack.competitorContentCuration = req.body.competitorContentCuration;
		pack.emailReports = req.body.emailReports;
		pack.brandingDesign = req.body.brandingDesign;

	if (req.body.mouthlySubcription)
		{pack.mouthlySubcription = req.body.mouthlySubcription;}

	if (req.body.addPage)
		{pack.addPage = req.body.addPage;}

	if (req.body.addUser)
		{pack.addUser = req.body.addUser;}

	if (req.body.addBenchmark)
		{pack.addBenchmark = req.body.addBenchmark;
}
	if (req.body.socialAccounts) {
		pack.socialAccounts = req.body.socialAccounts;
		pack.socialAccounts.max_have = req.body.socialAccounts.max_have;

	}
	if (req.body.benchmarks) {
		pack.benchmarks = req.body.benchmarks;
		pack.benchmarks.max_have = req.body.benchmarks.max_have;

	}
	console.log("new Pack is :", pack);
	pack.updated_at =  Date.now();
	Pack.updateOne({ _id: req.params.id }, pack).then(
		() => {
			res.status(201).json({
				message: 'Pack updated !'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
}
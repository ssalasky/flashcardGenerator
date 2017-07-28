var ClozeCard = function(text, cloze) {
	if (this instanceof ClozeCard) {
		this.fullText = text;
		this.cloze = cloze;
		this.checkCloze = function() {
			var a = this.fullText;
			return a.indexOf(this.cloze) > -1;
		};
		this.partial = function() {
			if (this.checkCloze) {
				var res = this.fullText.replace(this.cloze, " .. ");
			} else {
				console.log("Oops, " + this.cloze + " is not in " + this.fullText + " .");
			};
		};
	} else {
		return new ClozeCard(text, cloze);
	};	
};

module.exports = ClozeCard;
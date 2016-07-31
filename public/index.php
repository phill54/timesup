<?php
$url = explode('?', $_SERVER['REQUEST_URI']);
$path = explode('/', $url[0]);

$build = isset($_GET['debug']) ? false : true;

?>
<html lang="de" manifest="cache.manifest">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
	<meta name="description" content="">
	<meta name="author" content="">
	<meta name="apple-mobile-web-app-capable" content="yes">

	<title>Time's up</title>

	<?php
	echo "<h1>";
	var_dump($build);
	echo "</h1>";
	?>
	<?php if ($build) { ?>
		<link href="css/main.css" rel="stylesheet">
		<script src="js/app.js"></script>
	<?php } else { ?>
		<link rel="stylesheet/less" type="text/css" href="css/main.less" />
		<script src="js-src/deps/less/dist/less.js" type="text/javascript"></script>
		<script src="js-src/deps/requirejs/require.js"></script>
		<script src="js-src/config.src.js"></script>
	<?php } ?>

</head>

<body class="container">
	<div data-role="page" id="game">
		<div data-role="header" data-position="fixed" data-theme="b">
			<h1>Time's up</h1>
			<a href="#options" data-transition="flip" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-bars">Optionen</a>
		</div>

		<div data-role="content">
			<div class="card">
				<h3 class="info">
					<span class="round">Runde 1</span>
					<span class="badge">40</span>
					<span class="team">Team A</span>
				</h3>
				<h1 class="term">STARTE SPIEL</h1>
				<p class="timer">30</p>
			</div>


			<table class="table-stripe" style="width: 100%;">
                <thead>
                  <tr class="ui-bar-d">
                    <th>Runde</th>
                    <th data-priority="1">Team A</th>
                    <th data-priority="2">Team B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <th>&nbsp;</th>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
		</div>

		<div data-role="footer" data-position="fixed" data-theme="b" style="text-align: center;">
				<button class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-carat-r" style="background-color: #0073e6; font-size: 1em;">Start</button>
				<button class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-check" style="background-color: #009900; font-size: 1em;" disabled>Richtig</button>
			</div>
		</div>

	</div>

	<div data-role="page" id="options">
		<div data-role="header" data-position="fixed" data-theme="b">
			<h1>Optionen</h1>
			<a href="#game"  data-transition="flip" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-home"></a>
		</div>

		<div data-role="content">
			<ul data-role="listview" data-divider-theme="b">
				<li data-role="list-divider">Sammlung spielen</li>
				<li><a href="#game" data-transition="flip">Filme</a></li>
				<li><a href="#game" data-transition="flip">Personen</a></li>
				<li data-role="list-divider">Sammlung bearbeiten</li>
				<li><a href="#edit" data-transition="flip">Filme</a></li>
				<li><a href="#edit" data-transition="flip">Personen</a></li>
				<li data-role="list-divider">Einstellungen</li>
				<li><a href="#newcollection" data-transition="flip">neue Sammlung</a></li>
				<li><a href="#resetcollection" data-transition="flip">Statistik zurücksetzen</a></li>
			</ul>
		</div>

		<div data-role="footer" data-position="fixed" data-theme="b">
			&nbsp;
		</div>
	</div>

	<div data-role="page" id="edit">
		<div data-role="header" data-position="fixed" data-theme="b">
			<h1>Sammlung</h1>
			<a href="#options" data-transition="flip" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-arrow-l"></a>
			<!-- <a href="#game"  data-transition="flip" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-home"></a> -->
			<!-- <a href="#options" data-transition="flip" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-bars">Optionen</a> -->
		</div>

		<div data-role="content">
			<ul data-role="listview" data-filter="true" data-filter-placeholder="Begriff suchen">
				<li><a href="#editterm" data-transition="flip">Acura</a></li>
				<li><a href="#editterm" data-transition="flip">Audi</a></li>
				<li><a href="#editterm" data-transition="flip">BMW</a></li>
				<li><a href="#editterm" data-transition="flip">Pink Cadillac</a></li>
				<li><a href="#editterm" data-transition="flip">Ferrari</a></li>
			</ul>
		</div>

		<div data-role="footer" data-position="fixed" data-theme="b" style="text-align: center;">
			<a href="#editterm" data-transition="flip" class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-plus" style="background-color: #009933; font-size: 1em;">Neu</a>
			<a href="#deletecollection" data-rel="popup" data-transition="flip" class="ui-btn ui-corner-all ui-btn-icon-right ui-icon-delete" style="background-color: #990000; font-size: 1em;">Löschen</a>
		</div>

		<div data-role="popup" id="deletecollection" data-dismissible="false" style="max-width:90%;">
			<div data-role="header">
				<h1>Löschen</h1>
			</div>
			<div data-role="main" class="ui-content">
				<h3 class="ui-title">Sicher, dass Du die Sammlung löschen wilst?</h3>
				<p>Diese Aktion kann nicht rückgängig gemacht werden.</p>
				<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-rel="back" data-transition="flip">Abbrechen</a>
				<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-rel="back" data-transition="flip">Löschen</a>
			</div>
		</div>
	</div>

	<div data-role="page" id="editterm">
		<div data-role="header" data-position="fixed" data-theme="b">
			<h1>Bearbeiten</h1>
			<a href="#edit" data-transition="flip" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-arrow-l"></a>
		</div>
		<div data-role="content">
			<form onsubmit="return false;">
				<label for="form-editterm">Begriff:</label>
				<input type="text" name="form-editterm" id="form-editterm" value="Pink Cadillac"/>
				<input type="button" value="Speichern" data-icon="check">
			</form>
		</div>
	</div>

	<div data-role="page" id="newcollection">
		<div data-role="header" data-position="fixed" data-theme="b">
			<h1>Neue Sammlung</h1>
			<a href="#options" data-transition="flip" class="ui-btn ui-btn-inline ui-corner-all ui-btn-icon-notext ui-icon-arrow-l"></a>
		</div>
		<div data-role="content">
			<form onsubmit="return false;">
				<label for="form-createterm">Name:</label>
				<input type="text" name="form-editterm" id="form-editterm" value="Pink Cadillac"/>
				<input type="button" value="Speichern" data-icon="check">
			</form>
		</div>
	</div>
</body>
</html>

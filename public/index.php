<?php
$url = explode('?', $_SERVER['REQUEST_URI']);
$path = explode('/', $url[0]);
//if (count($path) > 1) {
//    header("HTTP/1.0 404 Not Found");
//   echo $url[0] . " file not found";
//    die();
//}

$build = isset($_GET['debug']) ? false : true;
//manifest="cache.manifest"
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
<!--	<link rel="icon" href="../../favicon.ico">-->

	<title>Time's up</title>


	<?php if ($build) { ?>
			<?php
//				echo "<style>";
//				echo file_get_contents('css/main.css');
//				echo "</style>";
//				echo "<script>";
//				echo file_get_contents('js/app.js');
//				echo "</script>";
 			?>
		<link href="css/main.css" rel="stylesheet">
		<script src="js/app.js"></script>
		<script>
			require(['main'], function () {});
		</script>
	<?php } else { ?>
<!--		<link href="css/main.css" rel="stylesheet">-->
		<link rel="stylesheet/less" type="text/css" href="css/main.less" />
		<script src="js-src/deps/less/dist/less.js" type="text/javascript"></script>
		<script src="js-src/deps/requirejs/require.js" data-main="main"></script>
		<script src="js-src/config.src.js"></script>
	<?php } ?>

</head>

<body>

<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Time's up</a>
		</div>
		<div id="navbar" class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
<!--				<li><a action="newGame">neues Spiel</a></li>-->
<!--				<li><a action="scorePrevTerm">letzten Begriff werten</a></li>-->
				<li><a action="setTermsPersons">neues Spiel (Personen)</a></li>
				<li><a action="setTermsMovies">neues Spiel (Filme)</a></li>
<!--				<li><a href="#about">About</a></li>-->
<!--				<li><a href="#contact">Contact</a></li>-->
			</ul>
		</div><!--/.nav-collapse -->
	</div>
</nav>

<div class="container game">

	<div class="card">
		<h3 class="info">
			<span class="round">&nbsp;</span>
			<span class="badge">&nbsp;</span>
			<span class="team">&nbsp;</span>
		</h3>
		<h1 class="term">STARTE SPIEL</h1>
		<p class="timer">&nbsp;</p>
	</div>

	<div class="col-md-6">
		<table class="table table-striped">
			<thead>
				<tr>
					<th>#</th>
					<th>Team A</th>
					<th>Team B</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td class="score round-1 team-a">0</td>
					<td class="score round-1 team-b">0</td>
				</tr>
				<tr>
					<td>2</td>
					<td class="score round-2 team-a">0</td>
					<td class="score round-2 team-b">0</td>
				</tr>
				<tr>
					<td>3</td>
					<td class="score round-3 team-a">0</td>
					<td class="score round-3 team-b">0</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td class="score total team-a">0</td>
					<td class="score total team-b">0</td>
				</tr>
			</tbody>
		</table>
	</div>

</div><!-- /.container -->

<nav class="navbar navbar-inverse navbar-fixed-bottom">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="btn btn-lg btn-primary" action="startTimer">Start</button>
			<button type="button" class="btn btn-lg btn-success" action="nextCard" disabled>Richtig</button>
		</div>
	</div>
</nav>

</body>
</html>

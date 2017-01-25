<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicon -->
    <link type="image/x-icon" href="/favicon.ico" rel="icon" />
    <link type="image/x-icon" href="/favicon.ico" rel="shortcut icon" />

    <!-- Inject initial state into JS environment using templating -->
    <script>
      window.__config = {{ config }}
    </script>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="/static/reactapp/css/bootstrap.min.css">
    <!-- Optional theme -->
    <link rel="stylesheet" href="/static/reactapp/css/bootstrap-theme.min.css">

    <!-- Custom CSS -->
    <% for (var cssIndex = 0; cssIndex < htmlWebpackPlugin.files.css.length; cssIndex++) { %>
    <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[cssIndex] %>">
    <% } %>
    <title>{{ title }}</title>
  </head>
  <body style="background-color: #f5f5f5;">
    <!-- Loading -->
    <div id="loading" class="container hidden">
      <div class="panel panel-default">
        <div class="panel-body text-center">
          <h2>Loading...</h2>
          <div class="progress">
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="1" style="width: 100%">
            </div>
          </div>
        </div>
      </div>
    </div>
    <script type='text/javascript'>
      setTimeout(function() {
        var loadingElement = document.getElementById('loading');
        if (loadingElement !== undefined && loadingElement !== null) {
            loadingElement.className = "container";
        }
      }, 750);
    </script>
    <noscript>Please enable Javascript to use this page.</noscript>

    <!-- Application Root -->
    <div id="root" />

    <% for (var jsIndex = 0; jsIndex < htmlWebpackPlugin.files.js.length; jsIndex++) { %>
    <script src="<%= htmlWebpackPlugin.files.js[jsIndex] %>"></script>
    <% } %>
  </body>
</html>


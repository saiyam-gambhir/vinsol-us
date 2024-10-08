# config valid for current version and patch releases of Capistrano
lock "~> 3.11.2"

set :application, "vinsol-2021"
set :repo_url, "git@github.com:vinsol/Vinsol-US-Mkt.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/var/www/vinsol.com"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
# append :linked_dirs, "node_modules"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure


namespace :npm do
  desc "run npm install"
  task :install do |t|
    on roles(:app) do
      within release_path do
        execute :pwd
        execute :npm, :install
      end
    end
  end

  desc "npm run build:production"
  task :build do |t|
    on roles(:app) do
      within release_path do
        execute :ls, '-ltha'
        info release_path
        execute :npm, :run, "build:production"
      end
    end
  end
end


namespace :blog do
  desc "symlink blog directory inside build"
  task :symlink do |t|
    on roles(:app) do
      within release_path do
        execute :ln, '-s', "/var/www/vinsol-blog #{release_path}/public/build/blog"
      end
    end
  end

end

after 'deploy:symlink:linked_dirs', 'npm:install'
after 'npm:install', 'npm:build'
after 'npm:build', 'blog:symlink'

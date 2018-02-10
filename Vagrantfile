# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 8080, host: 8080

  git = "apt-get install -y git"

  git_config = <<-SHELL
    git config --global user.name "Sean Holden"
  SHELL

  zsh = "apt-get install -y zsh"

  ohmyzsh = <<-SHELL
    git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
    cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
  SHELL

  change_shell_to_zsh = "chsh -s /bin/zsh vagrant"

  nvm = <<-SHELL
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    echo '# nvm setup stuff' >> ~/.zshrc
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
    echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.zshrc
    nvm install v8.9.4
  SHELL


  config.vm.provision "shell", inline: "apt-get update"
  config.vm.provision "shell", inline: git
  config.vm.provision "shell", inline: git_config, privileged: false
  config.vm.provision "shell", inline: zsh
  config.vm.provision "shell", inline: ohmyzsh, privileged: false
  config.vm.provision "shell", inline: change_shell_to_zsh
  config.vm.provision "shell", inline: nvm, privileged: false
end

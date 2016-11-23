# Repository workflow

## Rules

In order to keep a clean history, please follow those rules precisely.

### 1: never commit on branches `develop` or `master`

Create your own branch `feature/my-feature`. This will avoid pollution on the
`master` and `develop` branch, and make the rebase workflow working like a charm.

Note that those rules can be transgress while setting up the git for the first
time.

### 2: use a commit message starting by `my-feature: `

Since rebase workflow avoid merge messages, we may not know which commit comes
from where. Using this rule will keep it clear.

### 3: first line in the commit message must be clear and concise

Limit the commit message length by ~80 characters per lines. Your first line
must give an explanatory overview of what is in the commit. It is recommanded
to use a detailled explanation in the rest of the commit.

Typical commit message:

    network: Socket API inner treatments refactoring

    Moving to a full OOP architecture of the API instead of using functions
    static functions.

# Git "rebase workflow" explanation

## Semantic

    $ (develop) git command # run this command on the develop branch
    $ git command           # run this command wherever you want

## Create local repository

    $ git clone git@github.com:FunkySayu/PowerSpikeGG.git target_folder

## Default config

In order to match correctly this workflow, you need to change the default pull
behavior. The following command line will automatically trigger a rebase
instead of a merge everytime a pull is done on the branch.

    $ git config pull.rebase true

Enabling rebase will avoid many merge reports that makes the history pretty
much unreadable.

## Update your local branch

    $ (master) git pull --prune

If you want to work on a modifed branch, after your checkout, git will tell you
that you are behind origin, you will just have to pull this branch:

    $ (modifiedBranch) git pull

## Create a branch

When you begin a new feature, checkout on `develop` and then create your
feature branch:

    $ (develop) git checkout -b feature/<feature_name>

Example with "*feature-a*":

    $ (develop) git checkout -b feature/feature-a
    $ (feature/feature-a) # do stuff
    $ (feature/feature-a) git add file-1 file-2 [...]
    $ (feature/feature-a) git commit  # please use a message, so avoid -m
    $ (feature/feature-a) git push -u origin featureA  # -u only needed the first time

## Updating your branch

You may want, during your work, to update your branch with the `develop`
branch:

    $ # Always pull before!
    $ git pull develop
    $ git pull master
    $ (feature/feature-a) git rebase develop && git pull

## Merging your work

Once your feature is done, merge it on `develop` with the `--no-ff` option to
keep the history of commits clean:

    $ (develop) git merge --no-ff feature/feature-a
    $ (develop) git push

**Always push working features on `develop`; you are not the only one working
on this branch!**

If you find bugs on the `develop` branch, please fix them quickly if you are
the author or ask the author to fix them as soon as possible. If needed, you
can also revert. Do NOT leave `develop` buggy.

Once your feature is done, you can remove your `feature/feature-a` branch:

    $ (develop) git branch -d feature/feature-a
    $ (develop) git push origin :feature/feature-a

## Releasing on master

Once the `develop` branch is mature enough to be released, you can merge it on
`master`:

    $ (master) git merge --no-ff develop
    $ (master) git push

# Credits

Originally written by Thomas Viau.

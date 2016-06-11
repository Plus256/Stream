<?php
for ($i = 1; $i <= 5; ++$i) {
        $pid = pcntl_fork();
        print($pid."\n");

        if (!$pid) {//code to be executed only child process
            sleep(1);
            print "In child $i\n";
            exit($i);
        }
    }

    while (pcntl_waitpid(0, $status) != -1) {
        $status = pcntl_wexitstatus($status);
        echo "Child $status completed\n";
    }
?>
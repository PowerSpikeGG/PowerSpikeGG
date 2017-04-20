fetcher_addr=$1
[ -z "$fetcher_addr" ] && echo "Required param fetcher address not found." && exit 1

trap echo SIGINT SIGTERM SIGTSTP

bazel build //powerspikegg/pyserving:server
bazel-bin/powerspikegg/pyserving/server --model_root_path=$(pwd)/powerspikegg/computation_models/static/trained_11_2017_04_06 &
s_pid=$!

bazel build //powerspikegg/go_gateway
bazel-bin/powerspikegg/go_gateway/go_gateway --grpc_fetcher_url=$fetcher_addr &
gw_pid=$!

{
    cd powerspikegg/frontend
    npm start  || true
} &
PID=$!
while kill -0 $PID >& /dev/null; do wait $PID; echo "check again"; done
kill -15 $s_pid
kill -15 $gw_pid
